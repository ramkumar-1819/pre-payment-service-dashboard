/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        DOMAIN: 'http://localhost:3000',
        ES_URL: 'https://elastic:NuwRaaWUktq5FM1QJZe6iexV@my-deployment-3eafc9.es.ap-south-1.aws.elastic-cloud.com:9243/',
        CORE_INDEX: 'vs-payment-services-data',
        XAPI_KEY: '78b8b44c-0379-428b-a8b0-c3ee22464d79',
        SECRET: '0db13f9b549a94496cbf187b77a8ba6d',
    }
}

module.exports = nextConfig
