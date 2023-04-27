window.onload = () => {
    axios({
        method: 'GET',
        url: 'https://t3balhdb57.execute-api.ca-central-1.amazonaws.com/personalSiteQuery',
        params: { page: 'website' }
    }).then((res) => {
        setBtnClick();
        setHomePage(res.data[0]);
        createTechSkillsCards(res.data[4]);
        createXPEduCard(res.data[2], false);    //education
        createXPEduCard(res.data[3], true);     //experience
        createProjectCards(res.data[5]);
        createAboutPage(res.data[1]);
    });
};

function setHomePage(data) {
    $('#home h1').text(data.data.header);
    for (const text of data.data.text) {
        $('#home').append(`<h3 class='blue col h4'>${text}</h3>`);
    }
}

function createAboutPage(data) {
    for (const i in data.data) {
        if (i==0) {
            $('#about h6').text(data.data[i]);
        }
        else {
            let splitData = data.data[i].split(':');
            $('#about ul').append(`
                <li><span class="orange">${splitData[0]}:</span>
                <span class="base">${splitData[1]}</span></li>
            `);
        }
    }
    // $('#about').text(data.data);
}

function setBtnClick() {
    let pageList = ['home', 'resume', 'projects', 'about'];
    for (const page of pageList) {
        $(`#${page}Btn`).on('click', () => { setVisibile(page, pageList) });
    }
}

function setVisibile(selectedPage, pageList) {
    for (const page of pageList) {
        if (selectedPage == page) {
            $(`#${page}`).toggleClass('hidden', false);
            $(`#${page}Btn`).toggleClass('active', true);
        }
        else {
            $(`#${page}`).toggleClass('hidden', true);
            $(`#${page}Btn`).toggleClass('active', false);
        }
    }
}

function createXPEduCard(data, isXP) {
    let card = 'edu';
    let subtitle = data.data.school;
    
    if (isXP) {
        card = 'xp'
        subtitle = data.data.company; 
        $(`#${card} em span`).text(data.data.skills);
    }
    $(`#${card} h2`).text(data.data.title);
    $(`#${card} h5`).text(subtitle);
    $(`#${card} p`).text(data.data.date);
    
    for (const detail of data.data.details) {
        $(`#${card} ul`).append(`<li class="card-text">${detail}</li>`);
    }
}

function createTechSkillsCards(skillsData) {
    const maxRowLength = 5;
    const faIcons = {'languages':'code', 'OS':'terminal', 'other':'gears'};
    for (const [type, skills] of Object.entries(skillsData.data)) {
        $('#skills').append(
            $(`<div id="${type}" class="card border-0 d-flex justify-content-evenly">
                <h3 class="h2">
                <i class="fa-solid fa-${faIcons[type]}"></i>
                <span></span></h3>
                <div id="${type}List" class="row"></div></div>`
            )
        );
        $(`#${type} span`).text(capitalizeFirstLetter(type));
        
        for (const index in skills) {
            if (((parseInt(index)) % maxRowLength) == 0) {
                $(`#${type}List`).append('<ul class="col-md-auto"></ul>');    
            }
            $(`#${type}List ul:last`).append(`<li class="card-text">${skills[index]}</li>`);
        }  
    }
}

{/* <img src="code-img.png" class="card-img-top"> */}
function createProjectCards(projData) {
    for (const proj of projData.data) {
        let card = `<div class="card border-0 col"><a href="${proj.link}">
            <i class="fa-regular fa-folder-open fa-8x center orange"></i>
            <div class="card-text">
            <h4 class="card-title fw-bold h3 center">${proj.name}</h4>
            <em class="card-text text-primary font-italic center">
            <i class="fa-solid fa-code "></i>${proj.skills}</em><ul>`;

        for (const text of proj.description) {
            card += `<li class="card-text">${text}</li>`;
        }      
        card += `</ul></div></a></div>`;
        $('#projects').append(card);
    }
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}