(() => {
  const picker = document.getElementById("rate-picker");
  const vehicle = document.getElementById("rate-vehicle");
  const disk = document.getElementById("rate-disk");
  const size = document.getElementById("rate-size");
  const numberFormat = new Intl.NumberFormat("uk-UA", { useGrouping: true });
  const amounts = ["rate-mount", "rate-fit", "rate-balance", "rate-single", "rate-set", "rate-rim"];
  let rows;

  function showPrice() {
    const cells = rows[size.selectedIndex].cells;
    amounts.forEach((id, index) => {
      const price = numberFormat.format(Number(cells[index + 1].textContent));
      const minimum = id === "rate-rim" && disk.value === "alloy" ? "від " : "";
      const unit = id === "rate-single" || id === "rate-set" ? "" : " грн";
      document.getElementById(id).textContent = minimum + price + unit;
    });
    document.getElementById("rim-work").textContent =
      disk.value === "alloy" ? "Рихтування диска" : "Відкатка диска";
  }

  function showSizes() {
    const previousSize = size.value || "R16";
    const table = document.querySelector(
      `table[data-vehicle="${vehicle.value}"][data-disk="${disk.value}"]`
    );
    rows = Array.from(table.tBodies[0].rows);
    size.replaceChildren(...rows.map(row => {
      const diameter = row.cells[0].textContent;
      return new Option(diameter, diameter, false, diameter === previousSize);
    }));
    showPrice();
  }

  vehicle.addEventListener("change", showSizes);
  disk.addEventListener("change", showSizes);
  size.addEventListener("change", showPrice);
  showSizes();
  picker.hidden = false;
})();
