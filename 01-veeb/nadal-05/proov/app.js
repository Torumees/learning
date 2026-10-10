const nupp = document.querySelector("#lae");
const ala = document.querySelector("#ala");
const url = "https://api.open-meteo.com/v1/forecast?latitude=59.44&longitude=24.75&current=temperature_2m"

nupp.addEventListener("click",async () => {
    try {
        ala.textContent = "Laen....";
        const vastus = await fetch(url);
        if(!vastus.ok) throw new Error(`Server vastas: ${vastus.status}`);
        const andmed = await vastus.json();
        ala.textContent = `Tallinnas on ${andmed.current.temperature_2m} C`;
    } catch (viga) {
        console.log(viga)
        ala.textContent = "Andmete laadimine ebaõnnestus.";
    }
});