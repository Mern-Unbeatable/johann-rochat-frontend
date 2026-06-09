export const transformPackageToCardFormat = (pkg) => {
    const isFeatured = pkg.name === 'Pack Pro' || pkg.slug === 'pack-pro';
    const formattedPrice = pkg.price % 1 === 0 ? pkg.price : pkg.price.toFixed(2);

    let description = "";
    let featureText = "";
    let subText = "";

    switch (pkg.name) {
        case 'Mini-Pack':
            description = "Pour tester simplement";
            featureText = "Idéal pour essayer une première amélioration";
            subText = `${pkg.pricePerCredit} CHF / amélioration`;
            break;
        case 'Pack Standard':
            description = "Le choix le plus populaire";
            featureText = "Parfait pour optimiser entièrement une annonce";
            subText = `${pkg.pricePerCredit} CHF / amélioration`;
            break;
        case 'Pack Pro':
            description = "Pour maximiser l'impact";
            featureText = "Idéal pour plusieurs versions et tests";
            subText = `${pkg.pricePerCredit} CHF / amélioration`;
            break;
        default:
            description = pkg.description || "Package description";
            featureText = "Package features";
            subText = `${pkg.pricePerCredit || (pkg.price / pkg.credits).toFixed(2)} CHF / amélioration`;
    }

    return {
        id: pkg.id,
        title: pkg.name.toUpperCase(),
        description: description,
        credits: pkg.credits.toString(),
        price: formattedPrice,
        subText: subText,
        featureText: featureText,
        features: pkg.features || [],
        featured: isFeatured
    };
};