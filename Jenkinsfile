pipeline {
    agent any

    tools {
        // Spécifiez la version de Node.js à utiliser
        nodejs 'node20'
    }

    stages {
        // Étape 1 : Récupération du code source
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Sarahbelaarabi/react.git'
            }
        }

        // Étape 2 : Installation des dépendances
        stage('Installation des Dépendances') {
            steps {
                sh 'npm install'
            }
        }

        // Étape 3 : Exécution des tests
        stage('Tests') {
            steps {
                sh 'npm test'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }

    post {
        success {
            echo 'Le pipeline a réussi !'
        }
        failure {
            echo 'Le pipeline a échoué.'
        }
    }
}