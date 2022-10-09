pipeline {
     agent any
     
        //Install denpendencies 
         // old iron 666
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
             }
        } 
    }
}
