pipeline {
     agent any
     
        //Install denpendencies 
    stages{
        stage('Install dependency')
        {
            steps{
             echo "Installing packages"
             sh 'yarn install --force'
             }          
        }

        stage('yarn build') 
        {
            steps{
             sh "yarn build"
             sh 'ls -la ./out'
             }
        } 
    }
}