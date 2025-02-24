import requests
import json

base_url = 'http://localhost:3003'

def openJsonFile(filename):
  print('Opening file: ', filename)
  with open(filename, 'r') as file:
    data = json.load(file)
  return data

def writeJsonFile(filename, data):
  print('Writing data to file: ', filename)
  json_dump = json.dumps(data, ensure_ascii=False)
  f = open(file=filename, mode='w', encoding='utf-8')
  f.write(json_dump)
  f.close()

def postNewRegions(data, ids):
  print('Posting data to /regions...')
  path = '/regions'
  url = base_url + path

  new_regions = []  
  for i in range(len(data)):
    data[i]['user'] = ids[i]
    result = requests.post(url, json=data[i])
    result_json = result.json()
    new_regions.append(result_json)
  
  return new_regions

def postNewUsers(data):
  print('Posting data to /users...')
  response = dict()
  path = '/users'
  url = base_url + path

  users_id = []
  new_users = []
  for line in data:
    x = requests.post(url, json=line)
    new_data = x.json()
    new_users.append(new_data)

    if '_id' in new_data:
      users_id.append(new_data['_id'])

  response['data'] = new_users
  response['ids'] = users_id
  
  return response


def main():
  print('Program Start')
  # open json files to read
  new_users = openJsonFile('new_users.json')
  new_regions = openJsonFile('new_regions.json')

  # make requests with json data
  response_users = postNewUsers(new_users)
  response_regions = postNewRegions(new_regions, response_users['ids'])
  
  # write response in json file
  writeJsonFile('response_new_users.json', response_users['data'])
  writeJsonFile('response_new_regions.json', response_regions)

if __name__=="__main__":
  main()