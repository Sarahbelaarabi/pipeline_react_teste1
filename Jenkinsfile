pipeline {
    agent any

    tools {
        nodejs 'node20'
    }
    environment {
        SONARQUBE_SERVER = 'SonarQubeServer' // Nom de votre serveur SonarQube configuré dans Jenkins
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
        // stage('start') {
        //     steps {
        //         dir('pipeline') {
        //             sh 'npm start &'
        //             // "&" => cela indique à Jenkins de lancer la commande et de ne pas attendre qu'elle se termine pour passer à l'étape
        //            // => Si tu ne mets pas &, Jenkins attendra que le serveur React ait fini de se lancer avant de continuer à la prochaine étape
        //             sleep 10
        //             // had sleep khedmnna biha 3la 9bl "temps de demarage "  bch serveur se lance et soit accessible car des fois pipeline jenkins ktdoz l'etape suivant bla mtsna bzaff 
                    
        //         }
        //     }
        // }  


        //  supprimer  le conteneur Docker  (drnaha bch nsupprimer l'ancien conteneur avant de construire un nouveau)
         stage('suprrimer le conteneur Docker') {
            steps {
                dir('pipeline') {
                    sh 'docker stop  react-app-container'
                    sh 'docker rm -f react-app-container'
                }
            }
        }
        stage('Construire l\'image Docker') {
            steps {
                // sh 'docker --version'                ssh your-jenkins-server
                dir('pipeline') {
                    sh 'docker build -t pipeline-react .'
                }
            }
        }

        //  Démarrer le conteneur Docker
        stage('Démarrer le conteneur Docker') {
            steps {
                dir('pipeline') {
                    sh 'docker run -d -p 3000:3000 --name react-app-container pipeline-react'
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
        stage('Analyser avec sonaqube') {
             steps {
                 withSonarQubeEnv('SonarQubeServer') {
                      dir('pipeline') {
                        sh 'sonar-scanner'
                }
                 }
            }
        }
    }
    post {
        success {
            echo 'Le pipeline a réussi BRAVO SARAH !'
        }
        failure {
            echo 'Le pipeline a échoué, PAS GRAVE SARAH !'
        }
    }
}
