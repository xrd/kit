let mappings = {};

export function setKvMappings(_mappings) {
    mappings = _mappings;
}

function getUserIdCookie(cookies) {
    console.log('Cookies', cookies);
    return '1b5603d5e-8029-4538-8dc2-541d25aff3b7';
}

export async function handleKv(event) {
    const { url } = event.request;
    const userid = getUserIdCookie(event.request.headers.get('Cookie'));
    console.log('URL is: ', url );
    const paths = url.split('/');
    const key = paths[4].replace('.json', '').toUpperCase();
    console.log('Looking at key: ', key );
    const data = await mappings[key].list({ prefix: `${userid}:` } );
    console.log('Data is: ', data );
    return new Response( JSON.stringify( { data } )); 
};

export function isKvRequest(event) {
    return (event.request.url.includes('/kv/'));
}
