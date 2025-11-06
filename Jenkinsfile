pipeline {
    agent any

    environment {
        AWS_REGION = 'ap-south-1'
        AWS_ACCOUNT_ID = '956301286834'  // e.g. 123456789012
        REPO_NAME = 'newcia2'
        IMAGE_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${REPO_NAME}"
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo '📦 Fetching source code from GitHub...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '⚙️ Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo '🐳 Building Docker image...'
                    sh "docker build -t ${IMAGE_URI}:${BUILD_NUMBER} ."
                }
            }
        }

        stage('Login to AWS ECR') {
            steps {
                script {
                    echo '🔐 Logging into AWS ECR...'
                    sh """
                        aws ecr get-login-password --region ${AWS_REGION} | \
                        docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
                    """
                }
            }
        }

        stage('Push Image to ECR') {
            steps {
                script {
                    echo '⬆️ Pushing Docker image to AWS ECR...'
                    sh """
                        docker tag ${IMAGE_URI}:${BUILD_NUMBER} ${IMAGE_URI}:latest
                        docker push ${IMAGE_URI}:${BUILD_NUMBER}
                        docker push ${IMAGE_URI}:latest
                    """
                }
            }
        }

        stage('Deploy to ECS') {
            steps {
                script {
                    echo '🚀 Deploying latest image to ECS service...'
                    sh """
                        aws ecs update-service \
                          --cluster newcia2-cluster \
                          --service newcia2-service \
                          --force-new-deployment \
                          --region ${AWS_REGION}
                    """
                }
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline executed successfully! Deployed latest image to AWS ECS.'
        }
        failure {
            echo '❌ Pipeline failed. Check Jenkins logs.'
        }
    }
}
