# API DOCUMENTATION

- [API DOCUMENTATION](#api-documentation)
  - [`/api`](#api)
    - [`/ai`](#ai)
      - [POST `/recommendations`](#post-recommendations)
      - [POST `/recommendations/compare`](#post-recommendationscompare)
      - [POST `/location-recognition`](#post-location-recognition)
      - [POST `/itinerary`](#post-itinerary)
      - [POST `/itinerary/budget`](#post-itinerarybudget)

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
  <summary><a id="streamResponse"><font face="monospace">streamResponse=true</font></a></summary>

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

[See example above](#streamResponse)
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

#### POST `/itinerary`

<div align="right"><font face="monospace">/ai/api/itinerary</font></div>

**Request:**

Must include `sid` cookie with which `/recommendations` request was run.

```json
{
    "choice": "Finland",
    "streamResponse": false
}
```

**Response:**
```json
Fantastic choice! Finland offers a unique blend of vibrant cities, rich culture, and stunning winter landscapes. Here’s a detailed 5-day itinerary for your trip to Helsinki, incorporating local culture, cuisine, and outdoor winter activities.

### **5-Day Itinerary for Helsinki, Finland**

**Day 1: Arrival in Helsinki**
- Morning:
  - Arrive at Helsinki Airport.
  - Check into your mid-range hotel in the city center (recommendations: Hotel Klaus K or Scandic Continental).
- Afternoon:
  - Explore **Senate Square** and visit the stunning **Helsinki Cathedral**.
  - Walk to **Market Square (Kauppatori)** for local crafts and snacks.
- Evening:
  - Dinner at **Savotta**, a restaurant offering traditional Finnish cuisine with views of the square.
  - Optional: Evening stroll along the waterfront with views of the harbor.

**Day 2: Cultural Discovery**
- Morning:
  - Visit the **Ateneum Art Museum**, home to Finnish art from the 18th century to modern works.
- Afternoon:
  - Lunch at **Cafe Aalto**, located within the museum, known for its Scandinavian menu.
  - Visit the **Sibelius Monument** in Sibelius Park, a tribute to the famous Finnish composer.
- Evening:
  - Experience Finnish sauna culture at **Löyly**, a modern sauna by the sea, with a restaurant onsite.

**Day 3: Day Trip to Porvoo**
- Morning:
  - Take a bus or train to **Porvoo**, a picturesque medieval town (about 1 hour away).
  - Explore the colorful wooden houses and visit the **Porvoo Cathedral**.
- Afternoon:
  - Lunch at **Restaurant Tablo**, known for its cozy atmosphere and Finnish dishes.
  - Visit local artisan shops and the Porvoo Museum.
- Evening:
  - Return to Helsinki.
  - Dinner at **Restaurant Olo**, a Michelin-starred restaurant focusing on Nordic flavors (reservation recommended).

**Day 4: Arctic Experiences**
- Morning:
  - Take an organized day trip to **Helsinki's Winter Wonderland** (available tours may include activities like snowshoeing or ice fishing).
- Afternoon:
  - Enjoy a traditional Finnish lunch included in the tour.
  - Continue with winter activities: sledding or visiting reindeer farms.
- Evening:
  - Return to Helsinki.
  - Dinner at **Ravintola Nokka**, showcasing local, seasonal ingredients.

**Day 5: Local Exploration and Departure**
- Morning:
  - Visit **Kiasma Museum of Contemporary Art** to see innovative exhibitions.
  - Explore the **Design District**, checking out local boutiques and galleries.
- Afternoon:
  - Lunch at **Alohilma**, known for its fresh and organic dishes.
  - Relax at **Esplanadi Park** or enjoy shopping on the famous Mannerheimintie street.
- Evening:
  - Depart from Helsinki Airport.

### **Transportation Recommendations:**
- **Public Transport:** Use the Helsinki Card for unlimited travel on public transport (buses, trams, and metro).
- **Walking:** Helsinki is a walkable city, especially in the city center.

### **Accommodation Recommendations:**
- **Hotel Klaus K**: A modern hotel with a unique design and comfortable amenities.
- **Scandic Continental**: Centrally located with good access to public transport.

This itinerary allows you to immerse yourself in Helsinki's culture while also experiencing the enchanting winter atmosphere. Enjoy your trip to Finland!
```

<details>
  <summary><font face="monospace">streamResponse=true</font></summary>

[See example above](#streamResponse)
</details>

#### POST `/itinerary/budget`

<div align="right"><font face="monospace">/ai/api/itinerary/budget</font></div>

**Request:**

Must include `sid` cookie with which `/itinerary` request was run.

```json
{
    "streamResponse": false
}
```

**Response:**
```json
### **Estimated Budget for 5 Days in Helsinki, Finland**

Based on the provided 5-day itinerary and your mid-range travel preferences, here’s an approximate budget breakdown:

#### **1. Accommodation:**
- **Hotel Stay (4 nights)**
  - Mid-range hotel: $130 - $200 per night
  - Total for 4 nights: **$520 - $800**

#### **2. Transportation:**
- **Airport Transfer (round trip)**
  - Estimate: $40 - $80 (train or taxi)
- **Helsinki Card (Public Transport + Attractions)**
  - 3-day card (approximately): $60
- **Local Transport for remaining days:**
  - Estimate: $20 - $30
- **Total Transportation: **$120 - $170**

#### **3. Meals:**
- **Breakfast:**
  - Typically included in hotel stay, or estimate $10 per day for breakfast out.
- **Lunch:**
  - Estimate $15 - $25 per meal, 5 days: $75 - $125
- **Dinner:**
  - Estimate $25 - $50 per meal, 5 days: $125 - $250
- **Total Meals: **$400 - $500**

#### **4. Activities:**
- **Museum Entry Fees:**
  - Ateneum Art Museum: $15
  - Kiasma Museum: $15
  - Optional guided tours: $50 - $100 (based on your winter activities)
- **Day trip to Porvoo:**
  - Bus fare: $15 round trip
  - Additional activities/entrance fees: $20
- **Winter Wonderland Tour:**
  - Estimate: $100 - $150
- **Total Activities: **$275 - $390**

### **Total Estimated Budget:**
- **Low End:** $1,315 
- **High End:** $2,030

### **Budget Summary:**
- **Accommodation:** $520 - $800
- **Transportation:** $120 - $170
- **Meals:** $400 - $500
- **Activities:** $275 - $390

This estimated budget provides a comfortable and culturally enriching experience in Helsinki while keeping affordability in mind. Adjustments can be made based on specific food choices, activity selections, and accommodation preferences, but this serves as a solid foundation for your travel planning. Enjoy your exciting adventure in Finland!
```

<details>
  <summary><font face="monospace">streamResponse=true</font></summary>

[See example above](#streamResponse)
</details>
