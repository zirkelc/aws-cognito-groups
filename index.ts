import {
	CognitoIdentityProviderClient,
	CreateGroupCommand,
	DeleteGroupCommand,
	GetGroupCommand,
} from '@aws-sdk/client-cognito-identity-provider';

const region = 'eu-west-1';
// replace with your own test user pool id
const UserPoolId = 'eu-west-1_mAUElNRxp';
const GroupName = 'test-group';

const cognito = new CognitoIdentityProviderClient({ region: 'eu-west-1' });

// delete group initially
await cognito.send(
	new DeleteGroupCommand({
		UserPoolId,
		GroupName,
	}),
).catch(e => { });

for (let i = 0; i < 20; i++) {
	console.log('\ncreate group');
	await cognito.send(
		new CreateGroupCommand({
			UserPoolId,
			GroupName,
			Description: '',
		}),
	).catch(e => console.error(e.name, e.message));

	console.log('\nget group');
	const group = await cognito.send(
		new GetGroupCommand({
			UserPoolId,
			GroupName,
		}),
	).catch(e => console.error(e.name, e.message));;

	console.log('\ndelete group');
	await cognito.send(
		new DeleteGroupCommand({
			UserPoolId,
			GroupName,
		}),
	).catch(e => console.error(e.name, e.message));;
}
