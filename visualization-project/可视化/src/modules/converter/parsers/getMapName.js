export default function getMapName(key, map) {
  return key in map && map[key] && map[key].name ? map[key].name : key
}
