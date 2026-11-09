import re
import time


class AbortRetry(Exception):
    """Raise from a retry on_error callback to stop retrying and re-raise the
    wrapped exception immediately."""

    def __init__(self, cause):
        super().__init__(str(cause))
        self.cause = cause


class Utils:
    def retry(self, task, on_error, max_attempts, interval_in_ms):
        max_attempts = max(round(max_attempts), 1)
        interval_in_s = interval_in_ms / 1000

        for attempt in range(1, max_attempts + 1):
            try:
                return task(attempt)
            except Exception as e:
                if on_error:
                    try:
                        on_error(e, attempt)
                    except AbortRetry as abort:
                        raise abort.cause
                if attempt == max_attempts:
                    raise e

            if interval_in_ms > 0:
                time.sleep(interval_in_s)

        return None

    def convert_to_ordinal(self, i):
        suffixes = ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th']
        if i % 100 in (11, 12, 13):
            return f"{i}th"
        return f"{i}{suffixes[i % 10]}"

    def is_status_code_success(self, status_code):
        return 200 <= status_code <= 299

    def get_locator_text(self, locators):
        return ', '.join(str(l) for l in locators)

    def is_rectangle_include(self, rect1, rect2):
        return (
            rect1['x'] <= rect2['x']
            and rect1['y'] <= rect2['y']
            and rect1['x'] + rect1['width'] >= rect2['x'] + rect2['width']
            and rect1['y'] + rect1['height'] >= rect2['y'] + rect2['height']
        )

    def get_xpath(self, element, parent_map):
        """Build an absolute XPath for an ElementTree element.

        `parent_map` is a dict mapping child -> parent (build it once per
        document with `{c: p for p in tree.iter() for c in p}`). ET has no
        upward link, so we need this to walk to the root.
        """
        parts = []
        cur = element
        while cur is not None:
            tag = cur.tag
            parent = parent_map.get(cur)
            if parent is None:
                parts.insert(0, f"/{tag}")
                break

            siblings = list(parent)
            same_tag = [s for s in siblings if s.tag == tag]
            if len(same_tag) > 1:
                index = same_tag.index(cur) + 1
                parts.insert(0, f"/{tag}[{index}]")
            else:
                parts.insert(0, f"/{tag}")
            cur = parent

        xpath = ''.join(parts)
        # Some XML parsers emit a synthetic root node — strip it if present.
        if xpath.startswith('/#root'):
            xpath = xpath[len('/#root'):]
        return xpath


utils = Utils()
