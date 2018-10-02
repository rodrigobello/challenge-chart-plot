# Challenge Chart Plot (Solution)

Implementation for the [challenge-chart-plot](https://github.com/intelie/challenge-chart-plot)

[DEMO](#)

## Getting Started

### Requirements

- npm

### Installing

Clone the repository

```
git clone https://github.com/rodrigobello/challenge-chart-plot
cd challenge-chart-plot/
```

Install application dependencies

```
npm install
```

## Running application

```
npm start
```

## Running tests

```
npm test
```

## Notes

I would like to point out some details about the user's input.

### As an array

I understand events not being inside an array, since they not necessarily would arrive as a single data (in only one request). Therefore, in my implementation of the ```inputParser()``` (function responsible for mapping the input to the JSON array) I splitted the user's input by lines: each line corresponds to a JSON and consequently to an event.

### As valid JSONs

In the challenge's prototype, the user's input example did not corresponded to a valid JSON: using single quotes for strings (instead of double quotes) and with no quotes in the object properties.

- Valid JSON:
```json
{"type": "span", "timestamp": 1519862400000, "begin": 1519862400000, "end": 1519862460000}
```

- Prototype's example:
```javascript
{type: 'span', timestamp: 1519862400000, begin: 1519862400000, end: 1519862460000}
```

So, to fit my solution to the prototype, I added to the ```inputParser()``` function, an extra parameter: the **unsafe** flag. If the ```unsafe = true```, it uses the ```eval()``` to parse the string, rather than the ```JSON.parse()```. With the **eval**, I can parse strings such as the above.

However, if the example in the prototype is wrong and the input will actually come as a valid JSON, I strongly suggest **not using** the unsafe flag. It would require to replace the ```inputParser()``` call in the "Main" component:

```javascript
// Remove the second param since the default value is false.
const eventList = inputParser(input, true); // src/containers/Main/Main.js  (line 48)
```
