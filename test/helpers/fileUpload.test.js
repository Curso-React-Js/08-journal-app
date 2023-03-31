import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from '../../src/helpers/fileUpload';

cloudinary.config({
  cloud_name: 'dzixfhqqa',
  api_key: '785834725135882',
  api_secret: 'oAIvgqe1ec_j9_tqQHQvc_lHEss',
  secure: true,
});

describe('Pruebas en fileUpload', () => {
  
  test('debe de subir el archivo correctamente a cloudinary', async() => {

    const imageUrl = 'https://www.shutterstock.com/image-photo/magic-pink-rhododendron-flowers-on-260nw-97696616.jpg';
    const resp = await fetch( imageUrl );
    const blob = await resp.blob();

    const file = new File([blob], 'foto.jpg');

    const url = await fileUpload( file );
    expect( typeof url ).toBe('string');

    const segments = url.split('/');
    const imageId = segments[ segments.length - 1 ].replace('.jpg', '');
  
    const cloudResp = await cloudinary.api.delete_resources([ 'journal/' + imageId ], {
      resource_type: 'image'
    });
    // console.log({ cloudResp });
  });

  test('debe de retornar null', async() => {
    const file = new File([], 'foto.jpg');

    const url = await fileUpload( file );
    expect( url ).toBe(null);
  });
  
});