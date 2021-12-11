# Deploy node js contact form to Azure Web App

> Instructions how to deploy a simple node js contact form to Azure web app.

* [**Deploy Directly from Git Repo**](#deploy-directly-from-git-repo)
* [Deploy from file](#deploy-from-file)
* [To remove the app](#To-remove-the-app)

## Signup for free tier Azure
https://azure.microsoft.com/en-ca/free/ 

The free Azure Tier allows you to have up to 10 web apps at no cost. Not a bad deal!


## Deploy Directly from Git Repo

You can also take this repo as is and deploy it directly to Azure in a few minutes.

```PowerShell
# set app name, app service plan ,resource group and git repo
$webappname="mysamplenodeform"
$appserviceplan="BasicAppServicePlan"
$resourcegroupname="rg1"
$gitrepo="https://github.com/meatsac/nodejs-contact-form-azure"

# create a resource group
az group create --location centralus --name $resourcegroupname

# create an App Service plan
az appservice plan create --name $appserviceplan --resource-group $resourcegroupname --sku FREE

# create a Web App
az webapp create --name $webappname --resource-group $resourcegroupname --plan $appserviceplan

# deploy code from a Git repository
az webapp deployment source config --name $webappname --resource-group $resourcegroupname --repo-url $gitrepo --branch master --manual-integration

#set configuration and restart
az webapp config appsettings set --name $webappname --resource-group rg01 --settings EMAILSERVICE="hotmail" USER="bobsmith@outlook.com" PASS="pass"
az webapp restart --name $webappname
```

Now visit the the site (this will take a few minutes), i.e. https://mysamplenodeform.azurewebsites.net/

## Deploy from file

```PowerShell
cd ~/Documents
git clone https://github.com/meatsac/nodejs-contact-form-azure.git
cd nodejs-contact-form-azure
```
Within the cloned folder, alter to your liking.

```PowerShell
az group create --name rg01 --location centralus
az webapp up --name mysamplenodeform --plan BasicAppServicePlan --resource-group rg01 --sku FREE
#set configuration and restart
az webapp config appsettings set --name $webappname --resource-group rg01 --settings EMAILSERVICE="hotmail" USER="bobsmith@outlook.com" PASS="pass"
az webapp restart --name $webappname
```

Once the app is deployed (this will take a few minutes), open a browser and go to https://mysamplenodeform.azurewebsites.net/ 


Choose **App Services** in the sidebar to the left and the choose your app in the list that appears then go to **Deployment Credentials** to change your password for deployment:<br>
https://docs.microsoft.com/en-us/azure/app-service/app-service-deployment-credentials

## To remove the app

```PowerShell
$webappname="mysamplenodeform"
$appserviceplan="BasicAppServicePlan"
$resourcegroupname="rg1"

az webapp delete --name $webappname --resource-group $resourcegroupname
az appservice plan delete --name $appserviceplan --resource-group $resourcegroupname --yes
az group delete -n $resourcegroupname --yes
```
Or you can use https://portal.azure.com
