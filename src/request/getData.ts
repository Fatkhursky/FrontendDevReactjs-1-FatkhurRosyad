import api from "../Api/axios";

export default async function getData() {
  try {
    const data = await api.get('restaurant')
    return data
  } catch (error) {}
}
