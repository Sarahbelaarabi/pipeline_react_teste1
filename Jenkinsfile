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

        // stage("Quality gate") {
        //     steps {
        //         waitForQualityGate abortPipeline: true
        //     }
        // }
        stage('Vérifier le Quality Gate') {
            steps {
                script {
                        def qualitygates = waitForQualityGate()
                    if (qualitygates.status != 'OK') {
                        error "Le Quality Gate a échoué : ${qualitygates.status}"
                        }
                }
            }
        }
        stage ("scanner le fichier systeme avec trivy") {
            steps {
                dir('pipeline') {
                    sh '''
                    trivy fs . > trivyfs.txt
                    cat trivyfs.txt
                    '''
                }
                //tirvy va scanner le fichier systeme (code source, binaires, dépendances...) et  enregistrer les resultats dans un fichier txt
                // sh 'trivy fs . > trivyfs.txt'
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
// ankhdm bhada au cas ou hbst pipeline f stage dyal docker operations
        //  stage('Docker operations(Stop & Remove), Build & Run') {
        //     steps {
        //         dir('pipeline') {
        //             sh '''
        //             if [ "$(docker ps -a -q -f name=react-app-container)" ]; then
        //                 docker stop react-app-container
        //                 docker rm -f react-app-container
        //             fi
        //             docker build -t pipeline-react .
        //             docker run -d -p 3000:3000 --name react-app-container pipeline-react
        //             '''
        //         }
        //     }
        // }
        // stage('scanner docker image avec trivy'){
        //     steps{
        //         // triy va scanner l'image docker et enregistrer les resultats dans un fichier json
        //         // serverity => pour filtrer les vulnerabilités par niveau de severité
        //         // crITICAL,HIGH => pour afficher les vulnerabilités de niveau critique et haut
        //         sh' trivy image --severity CRITICAL,HIGH pipeline-react:latest'
        //         sh 'trivy image --format json --output trivy-results.json pipeline-react:latest'
        //     }

        // }
        stage('Push Docker Image to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'sarabelaarabi', usernameVariable: 'DOCKER_HUB_USER', passwordVariable: 'DOCKER_HUB_PASSWORD')]) {
                        sh '''
                            docker login -u $DOCKER_HUB_USER -p $DOCKER_HUB_PASSWORD
                            docker tag pipeline-react $DOCKER_HUB_USER/pipeline-react:latest
                            docker push $DOCKER_HUB_USER/pipeline-react:latest
                        '''
                    }
                }
            }
        }

// stage('Deploy to Kubernetes') {
//     steps {
//         dir('pipeline') {
//            withKubeConfig(
//             caCertificate: '', // Laissez vide si vous utilisez un fichier kubeconfig
//             clusterName: 'minikube', // Nom du cluster dans votre kubeconfig
//             contextName: '', // Laissez vide pour utiliser le contexte par défaut
//             credentialsId: 'k8-cred', // ID de la credential configurée dans Jenkins
//             namespace: 'default', // Namespace où déployer l'application
//             restrictKubeConfigAccess: false, // Autoriser l'accès au fichier kubeconfig
//             serverUrl: 'https://127.0.0.1:51378' // URL de l'API Kubernetes
//         ) {
//             sh "kubectl apply -f kubernetes-deployment.yaml"
//         }  
//         }
//     }
// }
// stage('Verify Kubernetes Deployment') {
//     steps {
//         dir('pipeline') {   
//                 withKubeConfig(
//             caCertificate: '', // Laissez vide si vous utilisez un fichier kubeconfig
//             clusterName: 'minikube', // Nom du cluster dans votre kubeconfig
//             contextName: '', // Laissez vide pour utiliser le contexte par défaut
//             credentialsId: 'k8-cred', // ID de la credential configurée dans Jenkins
//             namespace: 'default', // Namespace où vérifier les ressources
//             restrictKubeConfigAccess: false, // Autoriser l'accès au fichier kubeconfig
//             serverUrl: 'https://127.0.0.1:51378' // URL de l'API Kubernetes
//         ) {
//             sh "kubectl get pods -n default"
//             sh "kubectl get svc -n default"
//         }
//         }
//     }
// }

// stage('Deploy to Kubernetes') {
//     steps {
//         script {
//             // Récupérer le contenu du Secret text
//             withCredentials([string(credentialsId: 'k8-cred', variable: 'KUBECONFIG_CONTENT')]) {
//                 // Écrire le contenu dans un fichier temporaire sans interpolation
//                 writeFile file: 'kubeconfig', text: KUBECONFIG_CONTENT
//             }
//         }

//         // Utiliser le fichier kubeconfig temporaire
//         withEnv(['KUBECONFIG=kubeconfig']) {
//             sh "kubectl apply -f kubernetes-deployment.yaml"
//         }
//     }
// }
// stage('Verify Kubernetes Deployment') {
//     steps {
//         script {
//             // Utiliser le fichier kubeconfig temporaire
//             withEnv(['KUBECONFIG=kubeconfig']) {
//                 sh "kubectl get pods -n default"
//                 sh "kubectl get svc -n default"
//             }
//         }
//     }


    // stage('deploy to kubernetes') {
    //      environment {
    //     KUBECONFIG = credentials('kubeconfig')
    // }            
    //     steps{
    //         dir('pipeline') {
    //             sh 'kubectl apply -f kubernetes-deployment.yaml'
    //         }
    //     }
    // }
        stage('deploy to kubernetes') {
        steps {
            withCredentials([string(credentialsId: 'kubeconfig', variable: 'KUBECONFIG_CONTENT')]) {
                script {
                    // Écrire le contenu du Secret Text dans un fichier temporaire
                    writeFile file: 'kubeconfig', text: KUBECONFIG_CONTENT
                    // Définir la variable d'environnement KUBECONFIG pour pointer vers ce fichier
                    withEnv(['KUBECONFIG=kubeconfig']) {
                        dir('pipeline') {
                            // Appliquer le fichier Kubernetes
                            sh 'kubectl apply -f kubernetes-deployment.yaml'
                        }
                    }
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
