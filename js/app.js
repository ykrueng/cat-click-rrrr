(function() {
  // JavaScript Appliation
  // The app model contains data to run the app
const model = {
  currentCat: null,
  adminMode: false,   // control whether to show or hide admin form
  cats: [
    {
      name: 'Cutie',
      img: 'image/cat1.jpg',
      clickCount: 0
    },
    {
      name: 'Blue',
      img: 'image/cat2.jpg',
      clickCount: 0
    },
    {
      name: 'Twin',
      img: 'image/cat3.jpg',
      clickCount: 0
    },
    {
      name: 'Scary Cat',
      img: 'image/cat4.jpg',
      clickCount: 0
    },
    {
      name: 'Sad Face',
      img: 'image/cat5.jpg',
      clickCount: 0
    }
  ]
};

// The app controller as a hub between model and views
const controller = {
  init: function() {
    model.currentCat = model.cats[0]; // initialize curentCat
    listView.init();
    imgView.init();
    adminView.init();
  },
  getCats: function() {
    return model.cats;
  },
  getCurrentCat: function() {
    return model.currentCat;
  },
  setCurrentCat: function(cat) {
    model.currentCat = cat; // set currentCat
    imgView.render();  // render cat image to reflect change
    adminView.render(); // render admin data to reflect change
  },
  updateCat: function() {
    // This function is called by admin to update currentCat detail
    if (adminView.nameInput.value === model.currentCat.name &&
        adminView.imageInput.value === model.currentCat.img &&
        adminView.clickCountInput.value == model.currentCat.clickCount) {
      alert('Nothing to update!');
    } else if (!adminView.nameInput.value ||
               !adminView.imageInput.value ||
               !adminView.clickCountInput.value) {
      alert('Invalid input');
    } else {
      model.currentCat.name = adminView.nameInput.value;
      model.currentCat.img = adminView.imageInput.value;
      model.currentCat.clickCount = adminView.clickCountInput.value;
      listView.render(); // render cat list to reflect change
      imgView.render(); // render cat image to reflect change
    }
    adminView.render(); // render admin data to reflect change
  },
  getAdminMode: function() {
    return model.adminMode;
  },
  showAdmin: function() {
    model.adminMode = true;
    adminView.render();
  },
  hideAdmin: function() {
    model.adminMode = false;
    adminView.render();
  },
  incrementCounter: function() {
    model.currentCat.clickCount++;
    imgView.render();
    adminView.render();
  }
}

// View for cat menu shows the name of each cat
const listView = {
  init: function() {
    this.catList = document.getElementById('cat-list');
    this.catItems = [];
    const cats = controller.getCats();
    for (let i=0; i<cats.length; i++) {
      let catItem = document.createElement('li');
      catItem.addEventListener('click', function() {
        controller.setCurrentCat(cats[i]);
      });
      this.catItems.push(catItem);
      this.catList.append(catItem);
    };
    this.render();
  },
  render: function() {
    const cats = controller.getCats();

    for (let i=0; i<cats.length; i++) {
      this.catItems[i].textContent = cats[i].name;
    };
  }
};

// View for cat detail shows the image, name, and click count of selected cat
var imgView = {
  init: function() {
    this.catName = document.getElementById('cat-name');
    this.catCount = document.getElementById('cat-click-count');
    const catDiv = document.getElementById('cat-image');
    this.catImg = document.createElement('img');
    catDiv.append(this.catImg);

    this.catImg.addEventListener('click', function() {
      controller.incrementCounter();
    });

    this.render();
  },
  render: function() {
    const currentCat = controller.getCurrentCat();
    this.catImg.src = currentCat.img;
    this.catName.textContent = currentCat.name;
    this.catCount.textContent = currentCat.clickCount + ' click';
    this.catCount.textContent += currentCat.clickCount > 1 ? 's' : '';
  }
};

// View for admin menu to update cat detail
const adminView = {
  init: function() {
    this.adminButton = document.getElementById('admin-button');
    this.adminForm = document.getElementById('admin-form');
    this.cancelButton = document.getElementById('cancel-button');
    this.updateButton = document.getElementById('update-button');
    this.nameInput = document.getElementById('input-name');
    this.imageInput = document.getElementById('input-image');
    this.clickCountInput = document.getElementById('input-click-count');

    this.adminButton.addEventListener('click', function() {
      controller.showAdmin();
    });

    this.cancelButton.addEventListener('click', function() {
      controller.hideAdmin();
    });

    this.updateButton.addEventListener('click', function() {
      console.log('update cat');
      controller.updateCat();
    });

    this.render();
  },
  render: function() {
    const currentCat = controller.getCurrentCat();
    this.nameInput.value = currentCat.name;
    this.imageInput.value = currentCat.img;
    this.clickCountInput.value = currentCat.clickCount;
    if(!controller.getAdminMode()) {
      this.adminForm.style.display = 'none';
    } else {
      this.adminForm.style.display = 'initial';
    }
  }
}

console.log('Cat Clicker is Running!!!');
controller.init();
}())
