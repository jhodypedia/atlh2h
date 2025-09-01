// File: api/deposit.js
import axios from "axios";
import qs from "qs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { api_key, reff_id, nominal, type, metode } = req.body;

  // Validasi input
  if (!api_key || !reff_id || !nominal || !type || !metode) {
    return res.status(400).json({ error: "Semua field wajib diisi!" });
  }
  if (isNaN(nominal) || nominal <= 0) {
    return res.status(400).json({ error: "Nominal harus angka lebih dari 0" });
  }

  try {
    const response = await axios.post(
      "https://atlantich2h.com/deposit/create",
      qs.stringify({ api_key, reff_id, nominal, type, metode }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({
      error: error.response?.data || error.message
    });
  }
}
