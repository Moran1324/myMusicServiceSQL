'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('Playlists', [
      {
        "created_at": new Date(),
        "updated_at": new Date(),
        "name": "Mood",
        "cover_img": "https://images.8tracks.com/cover/i/001/739/937/image-9313.jpg?rect=0,0,1440,1440&q=98&fm=jpg&fit=max&w=640&h=640"
      },
      {
        "created_at": new Date(),
        "updated_at": new Date(),
        "name": "Rock",
        "cover_img": "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/02d28580-a520-4db3-933e-71d9a2e61b16/db06qcu-14a8e42f-3a15-4247-9345-df0a96072540.jpg/v1/fill/w_1024,h_1024,q_75,strp/classic_rock_playlist_cover_by_azucar95_db06qcu-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMDJkMjg1ODAtYTUyMC00ZGIzLTkzM2UtNzFkOWEyZTYxYjE2XC9kYjA2cWN1LTE0YThlNDJmLTNhMTUtNDI0Ny05MzQ1LWRmMGE5NjA3MjU0MC5qcGciLCJoZWlnaHQiOiI8PTEwMjQiLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS53YXRlcm1hcmsiXSwid21rIjp7InBhdGgiOiJcL3dtXC8wMmQyODU4MC1hNTIwLTRkYjMtOTMzZS03MWQ5YTJlNjFiMTZcL2F6dWNhcjk1LTQucG5nIiwib3BhY2l0eSI6OTUsInByb3BvcnRpb25zIjowLjQ1LCJncmF2aXR5IjoiY2VudGVyIn19.GHIvREGJysd8leF94pBmOt1Mp2SAz2Wc4k1XV0P4NkE"
      },
      {
        "created_at": new Date(),
        "updated_at": new Date(),
        "name": "Jazz",
        "cover_img": "https://pi.tedcdn.com/r/talkstar-assets.s3.amazonaws.com/production/playlists/playlist_335/for_jazz_lovers.jpg?"
      },
      {
        "created_at": new Date(),
        "updated_at": new Date(),
        "name": "Blues",
        "cover_img": "https://images.8tracks.com/cover/i/000/306/038/blues_bw-7377.jpg?rect=0,0,500,500&q=98&fm=jpg&fit=max"
      },
      {
        "created_at": new Date(),
        "updated_at": new Date(),
        "name": "Favourites",
        "cover_img": "https://data.whicdn.com/images/333588291/original.jpg?t=1564757013"
      },
      {
        "created_at": new Date(),
        "updated_at": new Date(),
        "name": "Long Drives",
        "cover_img": "https://www.stylemotivation.com/wp-content/uploads/2019/08/countries-drive-from-india-cover2-620x414.jpg"
      },
      {
        "created_at": new Date(),
        "updated_at": new Date(),
        "name": "Cleaning",
        "cover_img": "http://jazz88online.org/wp-content/uploads/2017/09/bigstock-Funny-woman-with-mop-Female-c-52762261_0-768x560.jpg"
      },
      {
        "created_at": new Date(),
        "updated_at": new Date(),
        "name": "Cooking",
        "cover_img": "https://images.8tracks.com/cover/i/009/185/063/cooking-4346.jpg?rect=17,6,895,895&q=98&fm=jpg&fit=max&w=640&h=640"
      },
      {
        "created_at": new Date(),
        "updated_at": new Date(),
        "name": "With Friends",
        "cover_img": "https://findmusicbox.com/assets/imagesall/Weekend-Hangouts.jpg"
      },
      {
        "created_at": new Date(),
        "updated_at": new Date(),
        "name": "Coding",
        "cover_img": "https://images.8tracks.com/cover/i/010/065/879/a1d4edfa309b3e04b5dd81065c24c874-5933.jpg?rect=420,0,1080,1080&q=98&fm=jpg&fit=max"
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Playlists', null, {});
  }
};
