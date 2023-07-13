import { View, HStack, Text } from "native-base";

export function BodyItem(theme, dateFormatter, collectionDate, visite, order, payment, formatter, data, firstItem,styles) {
    const sTimeString = data[2][0].StartTime
    const eTimeString = data[2][0].EndTime
    const formattedSTime = `${sTimeString.split(':')[0]}.${sTimeString.split(':')[1]}`;
    const formattedETime = `${eTimeString.split(':')[0]}.${eTimeString.split(':')[1]}`;
    const plasiyerCost = data[0][0].OrderAmountPriceSalesman
    const formattedPlasiyerCost = plasiyerCost.toLocaleString('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    });
    return <>
  
  
      <View style={[styles.circle, { borderColor: theme === "dark" ? 'rgb(130, 148, 196)' : 'rgb(47, 143, 157)' }]}>
        <Text style={[styles.title, { fontSize: 18, color: theme === "dark" ? 'rgb(130, 148, 196)' : 'rgb(47, 143, 157)' }]}>{dateFormatter(collectionDate)}</Text>
      </View>
  
      <HStack marginTop={10}>
        <View style={[theme === "dark" ? styles.darkItem : styles.lightItem, styles.itemRight,
        { display: visite === true ? 'flex' : 'none' }
        ]}>
          <View style={[styles.dividedItem, { borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderRightWidth: 0, width: '100%' }]}>
            <Text style={styles.description}>Ziyaret</Text>
          </View>
  
          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.dividedItem, { borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: 0, width: '50%' }]}>
              <Text style={styles.description}>Açıklama:</Text>
            </View>
            <View style={[styles.dividedItem, { borderRightWidth: 0, borderBottomWidth: 0, width: '50%' }]}>
              {firstItem === 1 ? <Text style={[styles.infoDesc, { textAlign: 'center', fontSize: 10 }]}>{data[2][0].Description}</Text> : null}
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.dividedItem, { borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: 0, width: '50%' }]}>
              <Text style={styles.description}>Ziyaret Saati:</Text>
            </View>
            <View style={[styles.dividedItem, { borderRightWidth: 0, borderBottomWidth: 0, width: '50%' }]}>
              {firstItem === 1 ? <Text style={styles.infoDesc}>{formattedSTime} - {formattedETime}</Text> : null}
            </View>
          </View>
  
        </View>
      </HStack>
      <HStack>
        <View style={[theme === "dark" ? styles.darkItem1 : styles.lightItem1, styles.itemLeft,
        { display: order === true ? 'flex' : 'none' }
        ]}>
          <View style={[styles.dividedItem, { borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderRightWidth: 0, width: '100%' }]}>
            <Text style={styles.description}>Sipariş</Text>
          </View>
  
          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.dividedItem, { borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: 0, width: '50%' }]}>
              <Text style={[styles.description, { textAlign: 'center' }]}>Plasiyerin Tutarı:</Text>
            </View>
            <View style={[styles.dividedItem, { borderRightWidth: 0, borderBottomWidth: 0, width: '50%' }]}>
              {firstItem === 1 ? <Text style={styles.infoDesc}>{formatter(formattedPlasiyerCost)}</Text> : null}
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.dividedItem, { borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: 0, width: '50%' }]}>
              <Text style={[styles.description, { textAlign: 'center' }]}>Sipariş Tutarı:</Text>
            </View>
            <View style={[styles.dividedItem, { borderRightWidth: 0, borderBottomWidth: 0, width: '50%' }]}>
              {firstItem === 1 ? <Text style={styles.infoDesc}>{formatter(data[0][0].OrderAmountPriceDefault)}</Text> : null}
            </View>
          </View>
  
        </View>
      </HStack>
      <HStack>
        <View style={[theme === "dark" ? styles.darkItem2 : styles.lightItem2, styles.itemRight,
        { display: payment === true ? 'flex' : 'none' }
        ]}>
  
          <View style={[styles.dividedItem, { borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderRightWidth: 0, width: '100%' }]}>
            <Text style={styles.description}>Tahsilat</Text>
          </View>
  
          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.dividedItem, { borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: 0, width: '50%' }]}>
              <Text style={[styles.description, { textAlign: 'center' }]}>Kredi Kartı:</Text>
            </View>
            <View style={[styles.dividedItem, { borderRightWidth: 0, borderBottomWidth: 0, width: '50%' }]}>
              {firstItem === 1 ? <Text style={styles.infoDesc}>{formatter(data[1][1].Amount)}</Text> :
                <Text style={styles.infoDesc}>{formatter(data[1][0].Amount)}</Text>}
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.dividedItem, { borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: 0, width: '50%' }]}>
  
            </View>
            <View style={[styles.dividedItem, { borderRightWidth: 0, borderBottomWidth: 0, width: '50%' }]}>
  
            </View>
          </View>
        </View>
      </HStack>
    </>;
}
  
