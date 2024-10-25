# API DOCUMENTATION

- [API DOCUMENTATION](#api-documentation)
  - [`/api`](#api)
    - [`/ai`](#ai)
      - [POST `/recommendations`](#post-recommendations)
      - [POST `/recommendations/compare`](#post-recommendationscompare)
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

#### POST `/recommendations/compare`

<div align="right"><font face="monospace">/ai/api/recommendations/compare</font></div>

**Request:**

Must include `sid` cookie with which `/recommendations` request was run.

```json
{
    "streamResponse": false
}
```

**Response:**
```json
| Destination | Cost       | Weather       | Activities and Attractions                     | Accommodation  | Safety | Culture       |
|-------------|------------|---------------|------------------------------------------------|-----------------|--------|---------------|
| Finland     | Moderate   | Cold, snowy   | Helsinki's design scene, Historical sites, Northern Lights in Lapland | Various        | High   | Very High     |
| Sweden      | Moderate   | Cold, snowy   | Stockholm's museums, Gamla Stan, nearby winter sports in Åre | Various        | High   | Very High     |
| Norway      | Moderate   | Cold, snowy   | Oslo's museums, Fjord tours, winter sports in Lillehammer | Various        | High   | High          |

### Summary of Criteria:

- **Cost**: All three destinations fall into a moderate price range, making them suitable for a mid-range traveler.
- **Weather**: Each location offers a cold, snowy climate, perfect for winter enthusiasts.
- **Activities and Attractions**:
  - **Finland** focuses on design and unique cultural experiences, along with stunning natural phenomena.
  - **Sweden** provides a mix of historical and modern attractions, along with access to winter sports.
  - **Norway** emphasizes impressive natural landscapes, along with rich cultural and historical experiences.
- **Accommodation**: All destinations offer a variety of accommodation options suitable for various budgets.
- **Safety**: All three countries are considered safe for travelers.
- **Culture**: Finland and Sweden provide very high cultural experiences, while Norway offers a high cultural experience focused on maritime history and natural beauty.

This table should assist you in making an informed decision based on your preferences!
```

<details>
  <summary><font face="monospace">streamResponse=true</font></summary>

```
data: |
data:  Destination
data:  |
data:  Cost
data:       
data:  |
data:  Weather
data:       
data:  |
data:  Activities
data:  and
data:  Attractions
data:                     
data:  |
data:  Accommodation
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
