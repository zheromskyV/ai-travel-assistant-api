# API DOCUMENTATION

- [API DOCUMENTATION](#api-documentation)
  - [`/api`](#api)
    - [`/ai`](#ai)
      - [POST `/recommendations`](#post-recommendations)
      - [POST `/location-recognition`](#post-location-recognition)

## `/api`

All `/api` endpoints are **protected** and will return `401` error unless a valid `X-Api-Key` header is provided.

Most requests to endpoints under `/api` can provide `streamResponse?: boolean` parameter in the body:

- `true` - response will be streamed via [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)
- `false` or omitted - the response will be provided in a standard way

### `/ai`

#### POST `/recommendations`

<div align="right"><font face="monospace">/ai/api/recommendations</font></div>

**Request:**
```json
{
    "questionnaire": [
        {
            "question": "What type of climate do you prefer?",
            "answer": "Cold (snow)"
        },
        {
            "question": "What kind of destination are you looking for?",
            "answer": "City and culture"
        },
        {
            "question": "How would you describe your travel style?",
            "answer": "Mid-range (comfort with cost-consciousness)"
        }
    ],
    "streamResponse": false
}
```

**Response:**
```json
1. Norway: Visit Oslo for its vibrant culture, the Viking Ship Museum, and the stunning architecture of the Oslo Opera House. Explore the beautiful landscapes of the fjords and enjoy winter activities like skiing in places like Lillehammer.

2. Finland: Experience Helsinki’s unique design scene, visit the historic Suomenlinna fortress, and enjoy the festive atmosphere during winter markets. Don't miss the chance to see the Northern Lights in Lapland.

3. Austria: Discover Vienna’s imperial palaces, the stunning art at the Belvedere, and enjoy a classical music concert. In Salzburg, visit Mozart's birthplace and enjoy the charming old town, surrounded by snow-capped mountains.
```

<details>
  <summary><font face="monospace">streamResponse=true</font></summary>

```
data: 1
data: .
data:  Norway
data: :
data:  Explore
data:  Oslo
data:  for
data:  its
data:  museums
data:  and
data:  waterfront
data: ,
data:  visit
data:  Bergen
data:  for
data:  the
data:  stunning
data:  fj
data: ords
data:  and
data:  colorful
data:  wooden
data:  houses
data: ,
data:  and
data:  enjoy
data:  winter
data:  activities
data:  like
data:  skiing
data:  and
data:  dog
data:  sled
data: ding
data:  in
data:  Trom
data: sø
data: .data: data: 
data: 2
data: .
data:  Finland
data: :
data:  Discover
data:  Helsinki
data: 's
data:  design
data:  district
```
</details>

#### POST `/location-recognition`

<div align="right"><font face="monospace">/ai/api/location-recognition</font></div>

**Request:**
```json
{
    "image": "data:image/jpeg;base64,/9j/2wBDAAYEBQYF..."
}
```

*`streamResponse` is not supported*

**Response:**
```json
This location appears to be Wrocław, Poland. The city is known for its beautiful architecture, including the characteristic red-roofed buildings and the iconic Gothic-style churches. My confidence level is high.
```