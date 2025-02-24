import json

def openJsonFile(filename):
  with open(filename, 'r') as file:
    data = json.load(file)
  return data

def writeJsonFile(filename, json_data):
  json_dump = json.dumps(json_data, ensure_ascii=False)
  f = open(file=filename, mode='w', encoding='utf-8')
  f.write(json_dump)
  f.close()
        
def getNewUsers(data):
  new_users = []

  for user in data:
    new_user = {
      "name": user['name'],
      "email": user['email']
    }
    for key, val in user.items():
      if key == 'location':
        new_user['location'] = user['location']
      if key == 'address':
        new_user['address'] = user['address']
    new_users.append(new_user)

  print(new_users)
  return new_users

def getNewRegions(data):
  new_regions = []

  for region in data:
    new_region = {
      "name": region['name']
    }
    for key, val in region.items():
      if key == 'location':
        new_region['location'] = region['location']
    new_regions.append(new_region)

  return new_regions

def main():
  users = openJsonFile('users.json')
  regions = openJsonFile('regions.json')

  new_users = getNewUsers(users)
  new_regions = getNewRegions(regions)
  writeJsonFile('new_users.json', new_users)
  writeJsonFile('new_regions.json', new_regions)


if __name__ == "__main__":
  main()