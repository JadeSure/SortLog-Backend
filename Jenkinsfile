pipeline {
    agent any
    
    environment {
        AWS_CRED = "AWS_sortlog"
        AWS_REGION = "ap-southeast-2"

        SORTLOG_DEV_REPO = "sortlog-dev"
        SORTLOG_PROD_REPO = "sortlog-prod"

        IMAGE_DEV = "$SORTLOG_DEV_REPO"
        IMAGE_PROD = "$SORTLOG_PROD_REPO"

        IMAGE_TAG = "${env.BUILD_TAG}"
        ECR_URL = "003374733998.dkr.ecr.ap-southeast-2.amazonaws.com"
    } 

    stages{
        stage ('Docker Build Test') {
            when {branch 'main'}
            agent {
                docker {
                    image 'node:16-alpine'
                }
            }

            steps {
                script {
                    echo "Testing...."
                    sh "yarn install && yarn pre-commit"
                }
                
            }
        }

         stage('Build Docker Image and Image Updating to ECR'){
            when { anyOf { branch 'main'; branch 'dev' } }
            stages {
                stage ('Docker Build & Upload Image to ECR'){
                    agent {
                        dockerfile {
                            filename 'Dockerfile-Sortlog-Env'
                            additionalBuildArgs  '--build-arg JENKINSUID=`id -u jenkins` --build-arg JENKINSGID=`id -g jenkins` --build-arg DOCKERGID=`stat -c %g /var/run/docker.sock`'
                            args '-v /var/run/docker.sock:/var/run/docker.sock -u jenkins:docker'
                        }
                    }

                    steps {
                        withAWS(credentials: AWS_CRED, region: AWS_REGION){

                            script {

                                if(currentBuild.result != null && currentBuild.result != 'SUCCESS'){
                                    return false
                                }

                                if (env.BRANCH_NAME == 'dev' ){
                                    echo "Building and Uploading Dev Docker Image to ECR"
                                    sh '''
                                        docker build -t $IMAGE_DEV:$IMAGE_TAG .
                                        docker images --filter reference=$IMAGE_DEV
                                        aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_URL
                                        docker tag $IMAGE_DEV:$IMAGE_TAG $ECR_URL/$IMAGE_DEV:$IMAGE_TAG
                                        docker push $ECR_URL/$IMAGE_DEV:$IMAGE_TAG
                                    '''
                                }
                                

                                if (env.BRANCH_NAME == 'main'){
                                    echo "Building and Uploading Prod Docker Image to ECR"
                                    sh '''
                                        docker build -t $IMAGE_PROD:$IMAGE_TAG .
                                        docker images --filter reference=$IMAGE_PROD
                                        aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_URL
                                        docker tag $IMAGE_PROD:$IMAGE_TAG $ECR_URL/$IMAGE_PROD:$IMAGE_TAG
                                        docker push $ECR_URL/$IMAGE_PROD:$IMAGE_TAG
                                    '''
                                }
                            }                    
                            
                        }
                    }
                }
            }
            
        } 

    }
    
    post {
        always {
            script {
                try{
                    // docker images -qa | xargs docker rmi -f
                    sh'''
                        docker rmi -f $(docker images -q)
                        docker system prune -f
                        cleanWs()
                    '''
                } catch (Exception e) {
                    echo "docker clean failed"
                }
            }
        
        }

        failure {
            // send message it was failsure
            echo "uhm... 我觉得不太行！"
        }

        success {
            // send message it was success
            echo "老铁！恭喜你，成功了呀!"
        }
    }
}
