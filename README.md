# resumelambda -> POST Calls

import boto3
import base64
from io import BytesIO
from datetime import datetime

s3 = boto3.client('s3')
dynamodb = boto3.client('dynamodb')

def lambda_handler(event, context):
    try:
        ID = event['ID']  # Fetch ID
        file_name = event['fileName']
        file_data = event['fileData'].split(',')[1]
        username = event['username']  # Fetch username
        
        # Upload file to S3
        s3.uploafileobj(
            Fileobj=BytesIO(base64.b64decode(file_data)),
            Bucket='resumebucket-2',
            Key=file_name
        )
        
        # Store file details in DynamoDB
        timestamp = datetime.now().isoformat()
        dynamodb.put_item(
            TableName='resumetable',
            Item={
                'fileId': {'S': file_name},
                'ID': {'S': ID},  # Partition key
                's3Location': {'S': f'https:/resumebucket-2.s3.us-east-1.amazonaws.com/{file_name}'},
                'uploadedAt': {'S': timestamp},
                'username': {'S': username}  # Add username field
            }
        )
        
        return {'message': 'Data uploaded successfully'}  # Updated response message
    
    except Exception as e:
        print("Error:", e)
        raise Exception('Failed to upload data')  # Updated error message


## resumegetlambda -> Retrieve Resumes to Display

import json
import boto3

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')

    table = dynamodb.Table('resumetable')

    response = table.scan()
    data = response['Items']

    while 'LastEvaluatedKey' in response:
        response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
        data.extend(response['Items'])
    return data


## GetResumesByUser -> Retrieve Resumes to Display Stored under the Current User


import boto3

def lambda_handler(event, context):
    # Get the username from the event
    username = event['username']
    
    # Create a DynamoDB resource
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    
    # Define the table
    table = dynamodb.Table('resumetable')
    
    # Perform a query operation to get data for the specified username
    response = table.query(
        IndexName='username-index',  # Assuming there's an index on the username attribute
        KeyConditionExpression='username = :u',
        ExpressionAttributeValues={':u': username}
    )
    
    # Return the queried data
    return response['Items']


Create 'username-index' in DynamoDB table item Indexes 