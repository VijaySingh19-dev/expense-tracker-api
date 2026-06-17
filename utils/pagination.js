export const paginated = async (
    model,
    query,
    page = 1,
    limit = 5 ,
    sort = ({createdAt : -1 })

    ) => {

        const skip = (page - 1) * limit

        const totalDocuments = await model.countDocuments(query);

        const result = await model.find({query})
                                .sort(sort)
                                .skip(skip)
                                .limit(limit);

        const totalPages = Math.ceil(totalDocuments/limit)

            const response = {
            page,
            limit,
            totalDocuments,
            totalPages,
            results
        };

        if(page > 1){
            response.prev = {
                page: page - 1,
                limit
            };
        }

        if(page < totalPages){
            response.next = {
                page: page + 1,
                limit
            };
        }

        return response;
};


