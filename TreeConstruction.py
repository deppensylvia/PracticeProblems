def TreeConstructor(strArr):

  childList = []
  parentList = []
 
  for elem in strArr:
    commaIdx = elem.find(",")
    childList.append(elem[1:commaIdx])
    parentList.append(elem[commaIdx+1:-1])

  if(not hasNoDuplicates(childList)):
    # print("has Duplicates")
    return "false"

  if(not hasOneRoot(childList, parentList)):
    # print("More than one root")
    return "false"
  
  if (not correctNumParents(parentList)):
    # print("Wrong number of children nodes per parent")
    return "false"

  return "true"

def hasNoDuplicates(childList):
  countArr = []
  for elem in childList:
    if elem not in countArr:
      countArr.append(elem)
    else:
        return False
  return True

def hasOneRoot(childList, parentList):
  rootCheck = [elem for elem in parentList if elem not in childList]
  # rootCheck = list(filter(lambda x: x not in childList, parentList)) #alternate way to filter
  if len(rootCheck) != 1:
    return False
  return True

def correctNumParents(parentList):
  countArr = {}
  for i in range(len(parentList)):
    if parentList[i] not in countArr.keys():
      countArr[parentList[i]] = 1
    else:
      countArr[parentList[i]]= countArr[parentList[i]] + 1

  for elem in countArr:
    if countArr[elem] > 2:
      return False
  return True