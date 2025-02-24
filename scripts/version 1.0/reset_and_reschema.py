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

def getUserLocationById(locationId, list):
  for location in list:
    for key, val in location.items():
      if key == '_id' and val == locationId:
        coordinates = [location['coordinates'][1], location['coordinates'][0]]
        return coordinates

def getRegionLocationById(locationId, list):
  for location in list:
    for key, val in location.items():
      if key == '_id' and val == locationId:
        return location['coordinates']
        
def getNewUsers(data, locations_data):
  new_users = []

  for user in data:
    new_user = {
      "name": user['name'],
      "email": user['email']
    }
    for key, val in user.items():
      if key == 'location':
        coordinates = getUserLocationById(user['location'], locations_data)
        type = 'Point'
        new_user['location'] = {
          'type': type, 
          'coordinates': coordinates
        }
      if key == 'address':
        new_user['address'] = user['address']
    new_users.append(new_user)

  print(new_users)
  return new_users

def getNewRegions(data, locations_data):
  new_regions = []

  for region in data:
    new_region = {
      "name": region['name']
    }
    for key, val in region.items():
      if key == 'location':
        coordinates = getRegionLocationById(region['location'], locations_data)
        type = 'Polygon'
        new_region['location'] = {
          'type': type, 
          'coordinates': coordinates
        }
    new_regions.append(new_region)

  return new_regions

def main():
  users = openJsonFile('users.json')
  userLocations = openJsonFile('userlocations.json')
  regions = openJsonFile('regions.json')
  regionLocations = openJsonFile('regionlocations.json')

  new_users = getNewUsers(users, userLocations)
  new_regions = getNewRegions(regions, regionLocations)
  writeJsonFile('new_users.json', new_users)
  writeJsonFile('new_regions.json', new_regions)


if __name__ == "__main__":
  main()