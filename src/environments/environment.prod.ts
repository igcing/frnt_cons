export const environment = {
  production: true,
  mapbox:{
    accessToken: 'pk.eyJ1IjoiaWN1ZXZhc2kiLCJhIjoiY2toaDZ1emwwMGVkNjJ6bTh4bjdzMXV0OSJ9.uka3rfUN7zXVdfrY5QMY0A'
  },
  urlComuna: 'http://localhost:8080/search/comuna',
  urlFarmacia:'http://localhost:8080/search/farmacia/7/filter?idComuna=$idComuna&nombreLocal=$nombreLocal'
};
