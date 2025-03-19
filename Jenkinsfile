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


         stage('Analyser avec sonarqube') {
             environment {
                SONAR_HOST_URL = 'http://localhost:9000'
        }
            steps {
                dir('pipeline') {

                    // version 1 : 
                            // withCredentials => Cette commande est utilisée pour gérer les informations sensibles (comme les tokens, mots de passe, etc.) de manière sécurisée dans Jenkins.
                            // Ces informations sont trop importantes pour être écrites directement dans le code (car n'importe qui pourrait les voir). Donc, Jenkins les stocke de manière sécurisée dans un coffre-fort (appelé "Credentials" dans Jenkins).
                            // Ensuite, nous pouvons les utiliser dans notre pipeline en les appelant par leur ID (credentialsId).
                            // variable: 'SONAR_TOKEN' => Cela signifie que nous pouvons utiliser cette variable (SONAR_TOKEN) dans notre pipeline pour stocker la valeur du token.

                    // version 2 : 
                            //Pourquoi on utilise withCredentials ?
                            // Parce que dans un pipeline, tu as parfois besoin d'utiliser des informations sensibles, comme :
                            // Un token (pour SonarQube, GitHub, etc.).
                            // Un mot de passe.
                            // Une clé d'API.
                        // Ces informations sont trop importantes pour être écrites directement dans le code (car n'importe qui pourrait les voir). Donc, Jenkins les stocke de manière sécurisée dans un coffre-fort (appelé "Credentials" dans Jenkins).
                    withSonarQubeEnv('sonarqube'){
                         withCredentials([string(credentialsId: 'sonarqube', variable: 'SONAR_TOKEN')]) {
                         sh '''
                            /var/lib/jenkins/tools/hudson.plugins.sonar.SonarRunnerInstallation/sonarqube/bin/sonar-scanner \
                             -Dsonar.projectKey=react_project \
                            -Dsonar.projectName=ReactProject \
                            -Dsonar.projectVersion=1.0 \
                            -Dsonar.sources=src \
                            -Dsonar.exclusions=**/node_modules/**,**/public/** \
                            -Dsonar.login=$SONAR_TOKEN
                         ''' 
                    // /var/.. => C'est le chemin vers le dossier où SonarQube est installé sur le serveur Jenkins.
                    // -Dsonar.projectKey => C'est l'identifiant unique de ton projet dans SonarQube. Il doit être unique pour chaque projet.
                    // -Dsonar.projectName => C'est le nom de ton projet dans SonarQube.
                    // -Dsonar.projectVersion => C'est la version de ton projet.
                    // -Dsonar.sources => C'est le chemin vers le dossier contenant ton code source.
                    // -Dsonar.login => C'est le token que tu as généré dans SonarQube pour ton projet. 
                    
                     }

                    }
                }
            }
        }

        stage('Vérifier le Quality Gate') {
            steps {
                script {
                    timeout(time: 5, unit: 'MINUTES'){
                        def qualitygates = waitForQualityGate()
                    if (qualitygates.status != 'OK') {
                        error "Le Quality Gate a échoué : ${qualitygates.status}"
                        }
                    }
                }
            }
        }
        
        
         stage('Build & Test') {
            steps {
                dir('pipeline') {
                     sh 'npm run build'
                      sh 'npm test'
                }
            }
        }
        //  supprimer  le conteneur Docker  (drnaha bch nsupprimer l'ancien conteneur avant de construire un nouveau)
         stage('Docker operations(Stop & Remove), Build & Run') {
            steps {
                dir('pipeline') {
                    sh 'docker stop  react-app-container'
                    sh 'docker rm -f react-app-container'
                    sh 'docker build -t pipeline-react .'
                    sh 'docker run -d -p 3000:3000 --name react-app-container pipeline-react'
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
