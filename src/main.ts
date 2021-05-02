import * as ec2 from '@aws-cdk/aws-ec2';
import { App, Stack } from '@aws-cdk/core';
import { KeyCloak } from 'cdk-keycloak';

const app = new App();

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION || 'us-east-1',
  certArn: process.env.CDK_KEYCLOAK_DEMO_ACM_ARN,
};

const stack = new Stack(app, 'cdk-keycloak-demo', { env });

new KeyCloak(stack, 'KeyCloak', {
  certificateArn: env.certArn || 'MOCK_ARN',
  auroraServerless: true,
  databaseInstanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE3, ec2.InstanceSize.SMALL),
  nodeCount: 0,
});

app.synth();