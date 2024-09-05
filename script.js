document.querySelector('#saveProfile').addEventListener('click', function() {
    const name = document.querySelector('#name').value
    const gender = document.querySelector('#gender').value
    const activityLevel = document.querySelector('#activity-level').value

    document.querySelector('#profile-summary').innerHTML = `
        <h3>Profile Summary</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Gender:</strong> ${gender}</p>
        <p><strong>Activity Level:</strong> ${activityLevel}</p>
    `;

    localStorage.setItem('userProfile', JSON.stringify({
        name,
        gender,
        activityLevel
    }))

    clearInputField(document.querySelector('#name'))

})   

document.querySelector('#calculate').addEventListener('click', function() {
    const weight = parseFloat(document.querySelector('#weight').value)
    const heightCentimeters = parseFloat(document.querySelector('#height').value)
    const heightMeters = heightCentimeters / 100
    const age = parseFloat(document.querySelector('#age').value)
    const gender = document.querySelector('#gender').value
    let activityLevel = document.querySelector('#activity-level').value

    if (isNaN(weight) || isNaN(heightCentimeters) || isNaN(age)) {
        return alert('Please enter valid numbers for weight, heightCentimeters and age!')
    }

    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * heightCentimeters - 5 * age + 5
    }
    else {
        bmr = 10 * weight + 6.25 * heightCentimeters - 5 * age - 161
    }

    if (activityLevel === 'Sedentary') {
        activityLevel = 1.2
    }else if (activityLevel === 'Lightly active') {
        activityLevel = 1.375
    }else if (activityLevel === 'Moderately active') {
        activityLevel = 1.55
    }else if (activityLevel === 'Very active') {
        activityLevel = 1.725
    }else if (activityLevel === 'Extra active') {
        activityLevel = 1.9
    }

    const maintenanceCalories = bmr * activityLevel

    const proteinGrams = weight * 1.8;
    const proteinCalories = proteinGrams * 4;

    const fatCalories = maintenanceCalories * 0.3;
    const fatGrams = fatCalories / 9;

    const carbsCalories = maintenanceCalories - (proteinCalories + fatCalories);
    const carbsGrams = carbsCalories / 4

    let bmi = Number((weight / (heightMeters * heightMeters)).toFixed(2))

    let bmiCategory;

    if (bmi < 18.50) {
        bmiCategory = 'Underweight'
    }else if (bmi >= 18.50 && bmi <= 24.99) {
        bmiCategory = 'Normal weight'
    }else if (bmi >= 25.00 && bmi <= 29.99) {
        bmiCategory = 'Overweight'
    }else if (bmi >= 30.00) {
        bmiCategory = 'Obesity'
    }
    
    const waterIntake = weight * 0.033;

    
    document.querySelector('#fitness-results').innerHTML = `
        <h3>Fitness Results</h3>
        <p><strong>BMR (Basal Metabolic Rate):</strong> ${bmr.toFixed(2)} kcal/day</p>
        <p><strong>TDEE (Total Daily Energy Expenditure):</strong> ${maintenanceCalories.toFixed(2)} kcal/day</p>
        <p><strong>Protein Requirement:</strong> ${proteinGrams.toFixed(2)} g/day</p>
        <p><strong>Fat Requirement:</strong> ${fatGrams.toFixed(2)} g/day</p>
        <p><strong>Carbohydrates Requirement:</strong> ${carbsGrams.toFixed(2)} g/day</p>
        <p><strong>BMI (Body Mass Index):</strong> ${bmi.toFixed(2)} (${bmiCategory})</p>
        <p><strong>Recommended Water Intake:</strong> ${waterIntake.toFixed(2)} liters/day</p>
    `;

    clearInputField(
        document.querySelector('#weight'),
        document.querySelector('#height'),
        document.querySelector('#age')
    )
})
function clearInputField(...field) {
    field.forEach(el => el.value = "")
}