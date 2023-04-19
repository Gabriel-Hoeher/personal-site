window.onload = () => {
    axios({
        method: 'GET',
        url: 'https://t3balhdb57.execute-api.ca-central-1.amazonaws.com/personalSiteQuery',
        params: { page: 'resume'}
    }).then((res) => {
        // console.log(res.data)
        createTechSkillsCards(res.data[0]);
        createProjectCards(res.data[1]);
        createXPEduCard(res.data[2], false);
        createXPEduCard(res.data[3], true);
    });
};

function createXPEduCard(data, isXP) {
    let card = 'edu';
    let subtitle = data.data.school;
    
    if (isXP) {
        card = 'xp'
        subtitle = data.data.company; 
    }

    $(`#${card} h1`).text(data.data.title);
    $(`#${card} p`).text(data.data.date);
    $(`#${card} h2`).text(data.data.company);

    for (const detail of data.data.details) {
        $(`#${card}`).append(`<p class="card-text">${detail}</p>`);
    }
}

function createTechSkillsCards(skillsData) {
    for (const [type, skills] of Object.entries(skillsData.data)) {
        // console.log(type, skills);
        $('#skills').append(
            $(`<div id="${type}" class="card" style="width: 20rem;">
                <h5 class="card-title"></h5>
                <table id="${type}Table"></table></div>`
            )
        );
        $(`#${type} h5`).text(type);
        
        for (const skill of skills) {
            $(`#${type}Table`).append(`<td class="card-text">${skill}</td>`);
        }  
    }
}

function createProjectCards(projData) {
    for (const proj of projData.data) {
        let card = $(`<div class="card" style="width: 20rem;">
            <img src="code-img.png" class="card-img-top"><div class="card-text">
            <h5 class="card-title">${proj.name}</h5>`
        );
        for (const text of proj.description) {
            $(card).append(`<p class="card-text">${text}</p>`);
        }      
        $(card).append(`</div></div>`);
    $('#projects').append(card);
    }
}


