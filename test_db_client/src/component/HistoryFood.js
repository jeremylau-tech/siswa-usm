import React from "react";
import './HistoryFood.css';
import HistoryFoodApplication from "./student/HistoryFoodApplication";

function HistoryFood() {
  return (
    <div className="history-food-page">
      <div className="sejarah-permohonan">
        <div className="sejarah-permohonan-container" >
          <h2 className="sejarah-permohonan-title">Sejarah Permohonan Bantuan Kupon Makanan</h2>
          <section>
            <HistoryFoodApplication></HistoryFoodApplication>
          </section>
        </div>
      </div>
    </div>
  );
}

export default HistoryFood;
