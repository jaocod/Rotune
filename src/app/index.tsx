import React, { useEffect, useMemo, useState } from 'react'
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native'

const alarmSounds = [
  'Dream Pulse',
  'Aurora Beat',
  'Nova Rise',
  'Electric Wake',
  'Cosmic Drift',
]

const getRandomSound = (currentSound: string) => {
  const options = alarmSounds.filter(sound => sound !== currentSound)
  return options[Math.floor(Math.random() * options.length)]
}

const Index = () => {
  const [alarmEnabled, setAlarmEnabled] = useState(true)
  const [currentSound, setCurrentSound] = useState(alarmSounds[0])
  const [nextTime, setNextTime] = useState('07:00 AM')

  useEffect(() => {
    if (!alarmEnabled) {
      return
    }

    const interval = setInterval(() => {
      setCurrentSound(prev => getRandomSound(prev))
    }, 10000)

    return () => clearInterval(interval)
  }, [alarmEnabled])

  const statusLabel = useMemo(
    () => (alarmEnabled ? 'Ativo e rotativo' : 'Desativado'),
    [alarmEnabled]
  )

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.brand}>Rotune</Text>
      <Text style={styles.subtitle}>Alarme rotativo para evitar a acomodação sonora</Text>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Próximo alarme</Text>
          <Text style={styles.cardStatus}>{statusLabel}</Text>
        </View>

        <Text style={styles.alarmTime}>{nextTime}</Text>
        <Text style={styles.cardText}>
          O som muda automaticamente para manter o seu alarme sempre surpreendente.
        </Text>

        <View style={styles.controlsRow}>
          <View style={styles.controlBlock}>
            <Text style={styles.controlLabel}>Modo rotativo</Text>
            <Switch
              value={alarmEnabled}
              onValueChange={setAlarmEnabled}
              thumbColor={alarmEnabled ? '#FFFFFF' : '#94A3B8'}
              trackColor={{ false: '#3B4254', true: '#7C4DFF' }}
            />
          </View>

          <Pressable style={styles.primaryButton} onPress={() => {}}>
            <Text style={styles.primaryButtonText}>Ajustar alarme</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Som atual</Text>
        <View style={styles.soundRow}>
          <View style={styles.soundBadge}>
            <Text style={styles.soundBadgeText}>{currentSound}</Text>
          </View>
          <Text style={styles.nextText}>Próximo som em breve</Text>
        </View>
      </View>

      <View style={styles.card}> 
        <Text style={styles.sectionTitle}>Sons disponíveis</Text>
        {alarmSounds.map(sound => (
          <View key={sound} style={styles.soundItem}>
            <Text style={styles.soundName}>{sound}</Text>
            <Text style={styles.soundHint}>{sound === currentSound ? 'Atualmente em uso' : 'Próximo candidato'}</Text>
          </View>
        ))}
      </View>

      <View style={styles.helpCard}>
        <Text style={styles.helpTitle}>Como funciona</Text>
        <Text style={styles.helpText}>
          Quando o alarme estiver ativo, o sistema troca o som de forma aleatória após um tempo para
          evitar que você se acostume com a mesma melodia.
        </Text>
      </View>
    </ScrollView>
  )
}

export default Index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1020',
  },
  content: {
    padding: 24,
    paddingBottom: 48,
  },
  brand: {
    color: '#7C4DFF',
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 22,
  },
  card: {
    backgroundColor: '#151B2E',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.16,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '700',
  },
  cardStatus: {
    color: '#22D3EE',
    fontSize: 14,
    fontWeight: '600',
  },
  alarmTime: {
    color: '#F8FAFC',
    fontSize: 56,
    fontWeight: '900',
    marginBottom: 10,
  },
  cardText: {
    color: '#94A3B8',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  controlsRow: {
    flexDirection: 'column',
  },
  controlBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  controlLabel: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: '#7C4DFF',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#F8FAFC',
    fontWeight: '700',
    fontSize: 16,
  },
  sectionTitle: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 14,
  },
  soundRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  soundBadge: {
    backgroundColor: '#7C4DFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
  },
  soundBadgeText: {
    color: '#F8FAFC',
    fontWeight: '700',
    fontSize: 14,
  },
  nextText: {
    color: '#94A3B8',
    fontSize: 12,
  },
  soundItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#212B44',
  },
  soundName: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: '600',
  },
  soundHint: {
    color: '#94A3B8',
    marginTop: 4,
    fontSize: 13,
  },
  helpCard: {
    backgroundColor: '#151B2E',
    borderRadius: 24,
    padding: 20,
  },
  helpTitle: {
    color: '#22D3EE',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  helpText: {
    color: '#94A3B8',
    fontSize: 14,
    lineHeight: 20,
  },
})