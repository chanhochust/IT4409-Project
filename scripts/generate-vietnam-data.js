// Temporary script to normalize dvhcvn data. Run once to refresh local JSON.
const https = require('https');
const fs = require('fs');
const path = require('path');

const SOURCE_URL = 'https://raw.githubusercontent.com/daohoangson/dvhcvn/master/data/dvhcvn.json';
const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'shared', 'data', 'vietnam');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }
        const chunks = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => {
          try {
            const data = JSON.parse(Buffer.concat(chunks).toString('utf8'));
            resolve(data);
          } catch (error) {
            reject(error);
          }
        });
      })
      .on('error', reject);
  });
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function normalize(data) {
  const provinces = [];
  const districts = [];
  const wards = [];

  for (const province of data.data) {
    provinces.push({ code: province.level1_id, name: province.name });

    for (const district of province.level2s) {
      districts.push({ code: district.level2_id, name: district.name, province_code: province.level1_id });

      for (const ward of district.level3s) {
        wards.push({ code: ward.level3_id, name: ward.name, district_code: district.level2_id });
      }
    }
  }

  return { provinces, districts, wards };
}

async function main() {
  ensureDir(OUTPUT_DIR);
  const raw = await fetchJson(SOURCE_URL);
  const { provinces, districts, wards } = normalize(raw);

  fs.writeFileSync(path.join(OUTPUT_DIR, 'provinces.json'), JSON.stringify(provinces, null, 2), 'utf8');
  fs.writeFileSync(path.join(OUTPUT_DIR, 'districts.json'), JSON.stringify(districts, null, 2), 'utf8');
  fs.writeFileSync(path.join(OUTPUT_DIR, 'wards.json'), JSON.stringify(wards, null, 2), 'utf8');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
