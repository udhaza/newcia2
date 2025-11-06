pipeline {
    agent any

    environment {
        APP_NAME = 'newcia2'
        IMAGE_TAG = 'v1'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/udhaza/newcia2.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    echo "Building Docker image..."
                    docker build -t $APP_NAME:$IMAGE_TAG .
                '''
            }
        }

        stage('Stop Old Container') {
            steps {
                sh '''
                    echo "Stopping old container if running..."
                    docker stop $APP_NAME || true
                    docker rm $APP_NAME || true
                '''
            }
        }

        stage('Run New Container') {
            steps {
                sh '''
                    echo "Running new container..."
                    docker run -d -p 3000:3000 --name $APP_NAME $APP_NAME:$IMAGE_TAG
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Deployment completed successfully!"
        }
        failure {
            echo "❌ Build or deployment failed!"
        }
    }
}
