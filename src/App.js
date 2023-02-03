import { useRef, useState, useCallback, useEffect } from "react";

window.normalize.config.japaneseAddressesApi = 'https://geolonia.github.io/japanese-addresses-chiban/api/ja';

const levels = {
  0: '正規化ができませんでした。',
  1: '都道府県名までの正規化ができました。',
  2: '市区町村名までの正規化ができました。',
  3: '町丁目までの正規化ができました。',
  7: '住居表示住所の街区までの判別ができました。',
  8: '住居表示情報がある区域では、住居表示住所の街区符号・住居番号までの判別ができました。住居表示住所情報がなあい場合は、地番住所の番地まで判別できました。',
}

const App = () => {
  const mapContainerRef = useRef();
  const [ result, setResult ] = useState(undefined)
  
  const onSubmit = useCallback(async (ev) => {
    ev.preventDefault()
    const inputText = (ev.currentTarget)['input']?.value
    if (!inputText) return
    const normalized = await window.normalize.normalize(inputText, { level: 8 })

    setResult({
      input: inputText,
      normalized,
    })
  }, []);

  useEffect(() => {
    if (!result) {
      return;
    }
    const n = result.normalized;
    let { lat, lng } = n;
    if (!lat || !lng) {
      // no coordinates, so no map
      return;
    }
    
    if (lat < -90 || lat > 90) {
      // try reversing lat/lng
      let memoLat = lat;
      lat = lng;
      lng = memoLat;
    }
    
    const mapEl = document.createElement('div');
    mapEl.setAttribute('class', 'geocoding-preview');
    mapEl.setAttribute('data-style', 'geolonia/gsi');
    mapEl.setAttribute('data-lng', lng);
    mapEl.setAttribute('data-lat', lat);
    mapEl.setAttribute('data-zoom', 16);
    mapEl.setAttribute('data-lang', 'ja');
    mapEl.setAttribute('data-open-popup', 'on');
    mapEl.setAttribute('data-gesture-handling', 'off');
    // mapEl.innerText = `元座標: ${coordinateInput.join(',')} (${convertCoordinatesFromTxt})\n\n世界座標系 (EPSG:4326)\n緯度: ${out[1]}\n経度: ${out[0]}`;
    
    const mapContainer = mapContainerRef.current;
    mapContainer.appendChild(mapEl);

    // eslint-disable-next-line no-undef
    const map = new geolonia.Map({
      container: mapEl,
    });

    return () => {
      map.remove();
      mapContainer.innerText = '';
    };
  }, [result]);

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="mb-3 mt-5">
        <div className="mb-3">
          <input type="text" name="input" className="form-control" placeholder="住所を入力してください。" />
        </div>
        <button type="submit" className="btn btn-primary">正規化</button>
      </form>
      { typeof result !== 'undefined' && <div>
        <p>{result.input}</p>
        <pre>{JSON.stringify(result.normalized, undefined, 2)}</pre>
        <p>正規化レベル: [{result.normalized.level}] {levels[result.normalized.level]}</p>
      </div> }

      <div ref={mapContainerRef}></div>
    </div>
  )
}

export default App;
