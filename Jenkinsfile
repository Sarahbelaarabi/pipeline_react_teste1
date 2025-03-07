pipeline {
    agent any

    tools {
        nodejs 'node20'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Sarahbelaarabi/pipeline_react_teste1.git'
            }
        }

        stage('acceder a le projet react ') {
            steps{
                script {
        
                    if (!fileExists('pipeline/package.json')) {
                        error("Le dossier 'pipeline' ou le fichier 'package.json' est manquant !")
                    }

            }
        }
        }
        stage('Installation des Dépendances') {
            steps {
                dir('pipeline') {
                    sh 'npm install'
                }
                
            }
        }
        stage('start') {
            steps {
                dir('pipeline') {
                    sh 'npm start &'
                    // sleep 10
                    // "&" => cela indique à Jenkins de lancer la commande et de ne pas attendre qu'elle se termine pour passer à l'étape
                   // => Si tu ne mets pas &, Jenkins attendra que le serveur React ait fini de se lancer avant de continuer à la prochaine étape
                }
            }
        }        
        stage('Tests') {
            steps {
                dir('pipeline') {
                    sh 'npm test'
                }
            }
        }
        stage('Build') {
            steps {
                dir('pipeline') {
                     sh 'npm run build'
                }
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
