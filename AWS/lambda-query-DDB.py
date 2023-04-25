import json
import boto3
from boto3.dynamodb.conditions import Key

def lambda_handler(event, context):
    client = boto3.resource('dynamodb')
    table = client.Table('personal-website')
    
    queryType = event['queryStringParameters']['page']
    
    if queryType in ['website', 'non-site']:
        res = table.query(
            IndexName = 'type-order-index', 
            ProjectionExpression = '#k, #d',
            ExpressionAttributeNames = {'#k': 'key', '#d': 'data'},
            KeyConditionExpression = Key('type').eq(queryType)
        )
    
    return {
        'statusCode': 200,
        'body': json.dumps(res['Items'])
    }