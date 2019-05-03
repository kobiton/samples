@Library("kobiton-pipeline@master") _

// Error message will send to slack if there is a step was failed.
String errorMessage = ""
String successMessage = ""

pipeline {
  agent {
    node {
      label "master"
    }
  }

  tools {
    nodejs 'Node 8.x'
  }

  environment {
    NPM_ACCESS_KEY = credentials("npm_access_token")
  }

  stages {
    stage("create NPM file") {
      steps {
        script {
          file.createNpmAuthFile(env.NPM_ACCESS_KEY)
        }
      }
    }

    stage("Linter check") {
      agent {
        dockerfile {
          args "-u root" 
          reuseNode true
        }
      }

      steps {
        script {
          errorMessage = "Failed to pass linter check"
          sh "cd /build && yarn lint" 
          successMessage = env.BRANCH_NAME.startsWith("PR-") ? consts.SLACK_MESSAGE_SUCCESS_PR : ""
        }
      }
    }
  }
  post {
    failure {
      script {
        if (errorMessage) {
          sendToSlack("[${packageJson.getModuleName()}] ${errorMessage}")
        }
      }
    }

    // For PR and upload manifest file
    success {
      script {
        if (successMessage) {
          sendToSlack("[${packageJson.getModuleName()}][Success] ${successMessage}")
        }
      }
    }
  }
} 
