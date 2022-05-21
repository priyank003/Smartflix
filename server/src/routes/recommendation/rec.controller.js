const axios = require("axios").default;

const BASE_URL="http://localhost:9000"

const httpRecommendWithRegression = async(req,res) => {
    const userId=req.params.userId
    
    const response = await axios.get(`${BASE_URL}/${userId}/regression`);
    const data = response.data;
    res.status(200).json(data);

};
const httpRecommendWithContent=()=>{
    const userId=req.params.userId
    const response = await axios.get(`${BASE_URL}/${userId}/contentbased`);
    const data= response.data;
    res.status(200).json(data)
}

const httpRecommendWithCollabi=()=>{
    const userId=req.params.userId
    const response = await axios.get(`${BASE_URL}/${userId}/collab-item`);
    const data= response.data;
    res.status(200).json(data)

}
const httpRecommendWithCollabu=()=>{
    const userId=req.params.userId
    const response = await axios.get(`${BASE_URL}/${userId}/collab-user`);
    const data= response.data;
    res.status(200).json(data)
}

module.exports={
    httpRecommendWithCollabi,
    httpRecommendWithCollabu,
    httpRecommendWithContent,
    httpRecommendWithRegression,   
}