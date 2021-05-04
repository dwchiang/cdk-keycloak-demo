# cdk-keycloak-demo

A demo app using `cdk-keycloak` CDK construct.
# Getting Started

1. Config the AWS CLI Profile.
    - AWS CDK will use the account and region info in the AWS CLI Profile.
2. Clone this project and head to the project root folder: `./`
3. Prepare an SSL certificate in the [AWS Certificate Manager (ACM)](https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-request-public.html#request-public-console).
    - The certificate needs to be created in the `us-east-1` region.
    - Create or List
        - Create: `aws acm request-certificate --domain-name your-keycloak-fqdn.example.com --validation-method DNS --region us-east-1`
        - List: `aws acm list-certificates --region us-east-1`
    - You will get one CertificateArn, please export it in shell: `export CDK_KEYCLOAK_DEMO_ACM_ARN="__YOUR_CERT_ARN_HERE__"`
    - Double check by `aws acm describe-certificate --certificate-arn $CDK_KEYCLOAK_DEMO_ACM_ARN --region us-east-1`
4. `yarn install`
5. `cdk --profile YOUR_AWS_PROFILE_HERE bootstrap` or `cdk bootstrap`
6. `cdk --profile YOUR_AWS_PROFILE_HERE deploy` or `cdk deploy`

```
Outputs:
cdk-keycloak-demo.KeyCloakDatabaseDBSecretArn28BEB641 = arn:aws:secretsmanager:us-east-1:123456789012:secret:cdkkeycloakdemoKeyCloakData-3Qgb450KwBmV-LMFewo
cdk-keycloak-demo.KeyCloakDatabaseclusterEndpointHostname38FB0D1E = cdk-keycloak-demo-keycloakdatabaseauroraserverles-1skwwcoquy73i.cluster-ci8vgfirqmau.us-east-1.rds.amazonaws.com
cdk-keycloak-demo.KeyCloakDatabaseclusterIdentifierF00C250B = cdk-keycloak-demo-keycloakdatabaseauroraserverles-1skwwcoquy73i
cdk-keycloak-demo.KeyCloakKeyCloakContainerSerivceEndpointURL9C81E19A = cdk-k-KeyCl-AY91KM2YW97Y-2101860371.us-east-1.elb.amazonaws.com
```

7. (Optional) Point the ELB endpoint (cdk-keycloak-demo.KeyCloakKeyCloakContainerSerivceEndpoint) as CNAME to your DNS.

8. Visit ELB endpoint with `https://` in your browser. For example:

```
https://cdk-k-KeyCl-AY91KM2YW97Y-2101860371.us-east-1.elb.amazonaws.com
```

9. In the browser, click on `Administration Console`.

- Username: `keycloak`
- Password: Go to your AWS Management Console (open in another separated browser tab) --> Secret Manager --> Find a secret named in this format **KeyCloakKCSecret9C81E19A-ID9ylhpKNagG** --> Secret value --> Click button **Retrieve secret value** --> You will see the password.

---

More detailed setup screenshots and work with CloudFront Extension OAuth2, please visit Ernest's blog post:

- (en) [Using AWS CDK to Deploy Static Website ft. OAuth 2.0 Authorization Code](https://www.ernestchiang.com/en/posts/2021/implementing-cloudfront-lambda-at-edge-oauth2-by-cdk/)
- (zh) [使用 AWS CDK 快速部署靜態網站，搭配 CloudFront Lambda@Edge 擴充 OAuth 2.0 Authorization Code 授權流程](https://www.ernestchiang.com/zh/posts/2021/implementing-cloudfront-lambda-at-edge-oauth2-by-cdk/)

