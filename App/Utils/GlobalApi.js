import { request, gql } from 'graphql-request'

const MASTER_URL="https://api-sa-east-1.hygraph.com/v2/clu7e8wod07wc07uqynmerb06/master"

const getSlider = async ()=> {
    const query = gql`
    query GetSlider {
        slider {
          id
          name
          image {
              url
            }
        }
      }
`
const result = await request(MASTER_URL, query)
return result
}

const getCategories = async () => {
  const query = gql`
  query GetCategory {
    categories {
      id
      name
      icon {
        url
      }
    }
  }
  `
  const result = await request(MASTER_URL, query)
  return result
}

const getBusinessLists = async () => {
  const query = gql`
  query getBusinessList {
    businessLists {
      id
      name
      email
      contactPerson
      category {
        name
      }
      address
      about
      images {
        url
      }
    }
  }
  `
  const result = await request(MASTER_URL, query)
  return result
}

const getBusinessListByCategory = async (category) => {
  const query = gql`
  query getBusinessList {
    businessLists(where: {category: {name: "`+category+`"}}) {
      id
      name
      email
      contactPerson
      category {
        name
      }
      address
      about
      images {
        url
      }
    }
  }
  `
  const result = await request(MASTER_URL, query)
  return result

}

const createBooking = async (data) => {
  const mutationQuery = gql `
  mutation createBooking {
    createBooking(
      data: {bookingStatus: Agendado, 
        date: "`+data.date+`", 
        businessList: {
          connect: {id: "`+data.businessId+`"}}, 
          time: "`+data.time+`", 
          userEmail: "`+data.userEmail+`", 
          userName: "`+data.userName+`"}
    ) {
      id
    }
    publishManyBookings(to: PUBLISHED) {
      count
    }
  }
  
  `

  const result = await request(MASTER_URL, mutationQuery)
  return result
}

const getUserBooking = async (userEmail) => {
  const query = gql `
  query GetUserBookings {
    bookings(orderBy: updatedAt_DESC, where: {userEmail: "`+userEmail+`"}) {
      time
      userEmail
      userName
      bookingStatus
      date
      id
      businessList {
        id
        images {
          url
        }
        name
        address
        contactPerson
        email
      }
    }
  }
  `
  const result = await request(MASTER_URL, query)
  return result
}

const createBusinessList = async (data) => {
  const mutationQuery = gql `
  mutation createBusinessList {
    createBusinessList(
      data: {name: "`+data.name+`", 
            contactPerson: "`+data.contactPerson+`", 
            about: "`+data.about+`", 
            address: "`+data.address+`", 
            serviceType: "`+data.serviceType+`", 
            email: "`+data.email+`"
            category: {create: {name: "`+data.category+`"}}
      }
    ) {
      id
    }
    publishManyBookings(to: PUBLISHED) {
      count
    }
  }
  `

  const result = await request(MASTER_URL, mutationQuery)
  console.log("global api", mutationQuery)
  return result
}

const getOcupationTime = async (businessId) => {
  const query = gql `
  query GetUserBookings {
    bookings(orderBy: updatedAt_DESC, where: {businessList: {id: "`+businessId+`"}}) {
      time
    }
  }
  
  `
  const result = await request(MASTER_URL, query)
  return result
}

export default {
    getSlider,
    getCategories,
    getBusinessLists,
    getBusinessListByCategory,
    createBooking,
    getUserBooking,
    createBusinessList,
    getOcupationTime
}