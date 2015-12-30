package Google::Test;
use strict;
use warnings;
use Selenium::Remote::Driver;
use base qw(Test::Class);
use Test::More;

my $SERVER_URL_LOCAL = 'http://127.0.0.1:4723/wd/hub';
my $USER_NAME = 'tester01';
my $API_KEY = '13e36639-92e3-411b-a067-3457b5dea573';
my $HOST_NAME = '192.168.74.51';
my $PORT = '3001';
my $GOOGLE_URL = 'https://mail.google.com';
my $GOOGLE_URL_HOMEPAGE = 'https://mail.google.com/mail/mu/mp/4/#tl/priority/%5Esmartlabel_personal';
my $TRASH_URL = 'https://mail.google.com/mail/mu/mp/4/#tl/Trash';
my $SENT_EMAIL_URL='https://mail.google.com/mail/mu/mp/68/#tl/Sent%20Mail';
my $PRIMARY_EMAIL_URL='https://mail.google.com/mail/mu/mp/68/#tl/priority/%5Esmartlabel_personal';
my $EMAIL_ADDRESS1 = 'krypton.portal@gmail.com';
my $EMAIL_ADDRESS2 = 'krypton.portal2@gmail.com';
my $PASSWORD = 'Admin@123456';
my $SUBJECT1 = 'It is a subject';
my $BODY1 = 'It is a body';
my $MSG_NOEMAIL = 'You have no mail here.';
my $MSG_NOEMAIL_PRIMARY1 = 'You have no mail.';
my $MSG_NOEMAIL_PRIMARY2 = 'Please enjoy your day!';
my $driver;
my $caps = {
    browserName       => "Chrome",
    deviceName        => "Nexus 5",
    platformName      => "ANDROID",
    platformVersion   => "5.1.1"
};

sub before : Test(setup){
  my $SERVER_URL = "http://" . $USER_NAME . ":" . $API_KEY . "\@" . $HOST_NAME . ":" . $PORT . "/v1/tests";
  print $SERVER_URL ."\n";
  $driver = Selenium::Remote::Driver->new_from_caps(
     remote_server_addr   => $HOST_NAME,
     port                 => $PORT,
     url                  => $SERVER_URL,
     desired_capabilities => $caps
  );

  $driver->set_implicit_wait_timeout(5000);
  $driver->set_timeout("page load",10000);
  $driver->delete_all_cookies();
}

sub should_not_accept_empty_or_invalid_email() : Test(2){
  print "should not accept empty or invalid email \n";
  $driver->get($GOOGLE_URL);
  $driver->find_element('next','id')->click();
  sleep 3;
  my $getError = $driver->find_element('errormsg_0_Email','id')->get_text();
  ok($getError, "Please enter your email.");
  $driver->find_element('Email','id')->send_keys('invalid_email@where.about');
  $driver->find_element('next','id')->click();
  sleep 3;
  ok($getError, "Sorry, Google doesn't recognize that email. Create an account using that address?");
}

sub should_login_and_compose_email_successfully() : Test(18) {
  print "should accept valid credentials \n";
  &login($EMAIL_ADDRESS1, $PASSWORD);
  my $getCurrentURL= $driver->get_current_url();
  my $expectedURL="https://mail.google.com/mail";
  like($getCurrentURL, qr/$expectedURL/,"https://mail.google.com/mail");
  print "should accept compose email successfully \n";
  &compose_email($EMAIL_ADDRESS2, $SUBJECT1, $BODY1);
  &verify_sent_email($SUBJECT1, $BODY1, $EMAIL_ADDRESS1, $EMAIL_ADDRESS2);
  &delete_sent_email();
  &delete_trash_email();
  &logout();
  &login($EMAIL_ADDRESS2, $PASSWORD);
  &verify_primary_email($SUBJECT1, $BODY1, $EMAIL_ADDRESS1, $EMAIL_ADDRESS2);
  &delete_primary_email();
  &delete_trash_email();
}

sub should_accept_valid_credentials(){
  print "should accept valid credentials \n";
  &login($EMAIL_ADDRESS1, $PASSWORD);
  my $getCurrentURL= $driver->get_current_url();
  my $expectedURL="https://mail.google.com/mail";
  like($getCurrentURL, qr/$expectedURL/,"https://mail.google.com/mail");
}

sub login(){
  print "call sub - login \n";
  my($username,$password)= @_;
  $driver->get($GOOGLE_URL);
  $driver->find_element('Email','id')->send_keys($username);
  $driver->find_element('next','id')->click();
  sleep 1;
  $driver->find_element('Passwd','id')->send_keys($password);
  $driver->find_element('signIn','id')->click();
  sleep 10;
}

sub logout(){
  print "call sub - logout \n";
  $driver->get($PRIMARY_EMAIL_URL);
  sleep 2;
  $driver->find_element('//div[@aria-label=\'Menu\']','xpath')->click();
  sleep 2;
  $driver->find_element('//div[contains(@class,\'V Y Rx Kg\')]','xpath')->click();
  sleep 2;
  $driver->find_element('//button[@id=\'signout\']','xpath')->click();
  sleep 5;
  $driver->get($GOOGLE_URL);
  $driver->delete_all_cookies();
  $driver->refresh();
  }

sub compose_email(){
  print "call sub - compose email \n";
  my($toEmail, $subject, $body)=@_;
  $driver->find_element('//div[@id=\'views\']//div[@aria-label=\'Compose\']','xpath')->click();
  sleep 1;
  $driver->find_element('//div[@id=\'cmcc_composeto\']//input[@id=\'composeto\']','xpath')->send_keys($toEmail);
  $driver->find_element('//input[@id=\'cmcsubj\']','xpath')->send_keys($subject);
  $driver->find_element('cmcbody','id')->send_keys($body);
  sleep 2;
  $driver->find_element('//div[@id=\'views\']//div[text()=\'Send\']','xpath')->click();
  sleep 1;
}

sub verify_sent_email(){
  print "call sub - verify sent email \n";
  my ($subject, $body, $sendEmail, $toEmail)=@_;
  $driver->find_element('//div[@aria-label=\'Menu\']','xpath')->click();
  sleep 2;
  $driver->find_element('//span[text()=\'Sent Mail\']','xpath')->click();
  sleep 2;
  my $getText = $driver->find_element('//div[@class=\'fm\']','xpath')->get_text();
  like($getText, qr/$subject/,$subject);
  like($getText, qr/$body/,$body);

  $driver->find_element('//div[contains(@class,\'m\')]//div[@role=\'listitem\'][1]','xpath')->click();
  sleep 1;
  $driver->find_element('//div[contains(@class,\'V j hj\') and text()=\'Details\']','xpath')->click();
  sleep 1;
  my $getSubject = $driver->find_element('//span[@class=\'kj\']/span','xpath')->get_text();
  my $getBody = $driver->find_element('//div[@class=\'Hi\']','xpath')->get_text();
  my $getSendEmail = $driver->find_element('//div[@class=\'Kg\']/span','xpath')->get_text();
  my $getToEmail = $driver->find_element('//div[@class=\'Kh\']//span[@class=\'Hh\']//span[@class=\'Kg ph\']','xpath')->get_text();

  like($getSubject, qr/$subject/,$subject);
  like($getBody, qr/$body/,$body);
  like($getSendEmail, qr/$sendEmail/,$sendEmail);
  like($getToEmail, qr/$toEmail/,$toEmail);
}

sub verify_primary_email(){
  print "call sub - verify primary email \n";
  my ($subject, $body, $sendEmail, $toEmail)=@_;
  $driver->get($GOOGLE_URL_HOMEPAGE);
  sleep 2;
  my $getText = $driver->find_element('//div[@class=\'fm\']','xpath')->get_text();

  like($getText, qr/$subject/,$subject);
  like($getText, qr/$body/,$body);

  $driver->find_element('//div[contains(@class,\'fm\')]//div[@role=\'listitem\'][1]','xpath')->click();
  sleep 1;
  $driver->find_element('//div[contains(@class,\'V j hj\') and text()=\'Details\']','xpath')->click();
  sleep 1;
  my $getSubject = $driver->find_element('//span[@class=\'kj\']/span','xpath')->get_text();
  my $getBody = $driver->find_element('//div[@class=\'Hi\']','xpath')->get_text();
  my $getSendEmail = $driver->find_element('//div[@class=\'Kg\']/span','xpath')->get_text();
  my $getToEmail = $driver->find_element('//div[@class=\'Kh\']//span[@class=\'Hh\']//span[@class=\'Kg ph\']','xpath')->get_text();

  like($getSubject, qr/$subject/,$subject);
  like($getBody, qr/$body/,$body);
  like($getSendEmail, qr/$sendEmail/,$sendEmail);
  like($getToEmail, qr/$toEmail/,$toEmail);
}

sub delete_sent_email(){
  print "call sub - delete sent email \n";
  $driver->get($SENT_EMAIL_URL);
  sleep 2;
  $driver->find_element('//div[@class=\'V j cb Ol\'][1]','xpath')->click();
  sleep 1;
  $driver->find_element('//div[@class=\'M j T b hc  Vm Im\']//div[@class=\'V j Xd\']','xpath')->click();
  sleep 1;
  my $noEmailSentEmail = $driver->find_element('//div[@class=\'Wl\']','xpath')->get_text();
  ok($MSG_NOEMAIL,$noEmailSentEmail);
}

sub delete_trash_email(){
  print "call sub - delete trash email \n";
  $driver->get($TRASH_URL);
  sleep 2;
  $driver->find_element('//div[@class=\'V j cb Ol\'][1]','xpath')->click();
  sleep 1;
  $driver->find_element('//div[@class=\'M j T b hc q m\']//div[text()=\'Delete forever\']','xpath')->click();
  sleep 1;
  my $noEmailTrash = $driver->find_element('//div[@class=\'Wl\']','xpath')->get_text();
  ok($MSG_NOEMAIL,$noEmailTrash);
}

sub delete_primary_email(){
  print "call sub - delete primary email \n";
  $driver->get($PRIMARY_EMAIL_URL);
  sleep 2;
  $driver->find_element('//div[@class=\'V j cb Ol\'][1]','xpath')->click();
  sleep 1;
  $driver->find_element('//div[@class=\'M j T b hc  Vm Im\']//div[@class=\'V j Xd\']','xpath')->click();
  sleep 1;
  my $noEmailPrimary = $driver->find_element('//div[@class=\'Wl\']','xpath')->get_text();

  like($noEmailPrimary, qr/$MSG_NOEMAIL_PRIMARY1/,$MSG_NOEMAIL_PRIMARY1);
  like($noEmailPrimary, qr/$MSG_NOEMAIL_PRIMARY2/,$MSG_NOEMAIL_PRIMARY2);
}

sub after : Test(teardown) {
  $driver->quit;
  sleep 10;
 }

done_testing();

Test::Class->runtests;
