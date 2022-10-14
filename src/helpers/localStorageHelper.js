export function saveStateProp(key, state) {
  localStorage.setItem(key, JSON.stringify(state))
}

export function deleteStateProp(key, state) {
  localStorage.removeItem(key);
}

export function getStateProp(key) {
  var value = localStorage.getItem(key)
  if (!value) {
    return null
  }
  try {
    value = JSON.parse(value)
  } catch (e) {
    return null
  }
  return value
}
