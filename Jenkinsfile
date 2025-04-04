pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = "lingashashank"
        FRONTEND_IMAGE = "${DOCKER_HUB_USER}/frontend:latest"
    }

    stages {
        stage('Clone Code') {
            steps {
                git 'https://github.com/LingaShashank/student-register-frontend.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $FRONTEND_IMAGE .'
            }
        }
        stage('Push to Docker Hub') {
            steps {
                withDockerRegistry([credentialsId: 'docker-hub-credentials', url: 'https://index.docker.io/v1/']) {
                    sh 'docker push $FRONTEND_IMAGE'
                }
            }
        }
    }
}
