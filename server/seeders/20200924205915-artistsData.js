'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('Artists', [
 {
    "created_at": new Date(),
    "updated_at": new Date(),
    "artist_name": "Shem Tov Havi",
    "cover_img": "https://www.israelhayom.co.il/sites/default/files/styles/566x349/public/images/articles/2020/08/03/15964441183904_b.jpg"
  },
  {
    "created_at": new Date(),
    "updated_at": new Date(),
    "artist_name": "Ha Dag Nahash",
    "cover_img": "https://upload.wikimedia.org/wikipedia/he/0/08/%D7%94%D7%93%D7%92%D7%A0%D7%97%D7%A9.png"
  },
  {
        "created_at": new Date(),
    "updated_at": new Date(),
    "artist_name": "Static and Ben-El",
    "cover_img": "https://images.maariv.co.il/image/upload/f_auto,fl_lossy/c_fill,g_faces:center,h_380,w_500/578319"
  },
  {
        "created_at": new Date(),
    "updated_at": new Date(),
    "artist_name": "Omer Adam",
    "cover_img": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Omeradam.jpg/220px-Omeradam.jpg"
  },
  {
        "created_at": new Date(),
    "updated_at": new Date(),
    "artist_name": "Shlomo Artzi",
    "cover_img": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Shlomo_Artzi_portrait.jpg/220px-Shlomo_Artzi_portrait.jpg"
  },
  {
        "created_at": new Date(),
    "updated_at": new Date(),
    "artist_name": "Eminem",
    "cover_img": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Eminem_-_Concert_for_Valor_in_Washington%2C_D.C._Nov._11%2C_2014_%282%29_%28Cropped%29.jpg/220px-Eminem_-_Concert_for_Valor_in_Washington%2C_D.C._Nov._11%2C_2014_%282%29_%28Cropped%29.jpg"
  },
  {
        "created_at": new Date(),
    "updated_at": new Date(),
    "artist_name": "Red Hot Chilli Peppers",
    "cover_img": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Rhcp-live-pinkpop05.jpg/270px-Rhcp-live-pinkpop05.jpg"
  },
  {
        "created_at": new Date(),
    "updated_at": new Date(),
    "artist_name": "Kendrick Lamar",
    "cover_img": "https://i.insider.com/5a58de42f421496e0f8b4848?width=600&format=jpeg&auto=webp"
  },
  {
        "created_at": new Date(),
    "updated_at": new Date(),
    "artist_name": "Eden Hasson",
    "cover_img": "https://i1.sndcdn.com/artworks-000589225994-tpf3j6-t500x500.jpg"
  },
  {
        "created_at": new Date(),
    "updated_at": new Date(),
    "artist_name": "Ed Sheeran",
    "cover_img": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Ed_Sheeran-6886_%28cropped%29.jpg/330px-Ed_Sheeran-6886_%28cropped%29.jpg"
  },
  {
        "created_at": new Date(),
    "updated_at": new Date(),
    "artist_name": "Kaveret",
    "cover_img": "https://img.discogs.com/o4PCZe-6SeIldsR0dt3d5wL2g2c=/fit-in/600x534/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-7422411-1441210344-6192.jpeg.jpg"
  },
  {
        "created_at": new Date(),
    "updated_at": new Date(),
    "artist_name": "Sia",
    "cover_img": "https://www.cheatsheet.com/wp-content/uploads/2020/01/sia.jpg"
  },
  {
        "created_at": new Date(),
    "updated_at": new Date(),
    "artist_name": "Adele",
    "cover_img": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Adele_2016.jpg/220px-Adele_2016.jpg"
  },
  {
        "created_at": new Date(),
    "updated_at": new Date(),
    "artist_name": "Arik Einstein",
    "cover_img": "https://kanweb.blob.core.windows.net/download/pictures/cat27720_img445496700.jpg"
  },
  {
        "created_at": new Date(),
    "updated_at": new Date(),
    "artist_name": "Afroman",
    "cover_img": "https://m.media-amazon.com/images/M/MV5BZGM3MDEzZmUtYzkxMi00NDUzLTgyYjYtMGIxN2FiYzA5YTA1XkEyXkFqcGdeQXVyMjUyNDk2ODc@._V1_.jpg"
  },
  {
        "created_at": new Date(),
    "updated_at": new Date(),
    "artist_name": "Maroon 5",
    "cover_img": "https://media.npr.org/assets/music/news/2010/09/maroon-e9cb8c5b25b4d1f3e68aa26e6a0ce51cf2ae59d8-s800-c85.jpg"
  },
  {
        "created_at": new Date(),
    "updated_at": new Date(),
    "artist_name": "Queen",
    "cover_img": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Queen_%E2%80%93_montagem_%E2%80%93_new.png/220px-Queen_%E2%80%93_montagem_%E2%80%93_new.png"
  },
  {
        "created_at": new Date(),
    "updated_at": new Date(),
    "artist_name": "Kygo",
    "cover_img": "https://edm.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTcyNDgxMzM5MzEwNzQ1NTE0/kygo.jpg"
  },
  {
        "created_at": new Date(),
    "updated_at": new Date(),
    "artist_name": "Arinana Grande",
    "cover_img": "https://www.grammy.com/sites/com/files/styles/image_landscape_hero/public/muzooka/Ariana%2BGrande/Ariana%2520Grande_16_9_1578384679.jpg?itok=vYR_9Sts"
  },
  {
        "created_at": new Date(),
    "updated_at": new Date(),
    "artist_name": "Marshmello",
    "cover_img": "https://edm.com/.image/t_share/MTYzODc4Nzc0ODMwNTQwNjI1/marshmello-arty.jpg"
  },
  {
        "created_at": new Date(),
    "updated_at": new Date(),
    "artist_name": "Coldplay",
    "cover_img": "https://ichef.bbci.co.uk/images/ic/960x540/p05c99dh.jpg"
  },
  {
        "created_at": new Date(),
    "updated_at": new Date(),
    "artist_name": "Arctic Monkeys",
    "cover_img": "https://m.media-amazon.com/images/I/41vAMnBdnzL.jpg"
  }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Artists', null, {});
  }
};
