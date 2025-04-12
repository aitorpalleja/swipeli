import { StyleSheet, View, Text, ScrollView, Pressable, Switch } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Globe, 
  Bell, 
  Moon, 
  Lock, 
  HelpCircle, 
  Info, 
  LogOut, 
  ChevronRight,
  Smartphone,
  Database,
  Shield
} from 'lucide-react-native';
import { useState } from 'react';

type SettingsSectionProps = {
  title: string;
  children: React.ReactNode;
};

const SettingsSection = ({ title, children }: SettingsSectionProps) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>
        {children}
      </View>
    </View>
  );
};

type SettingsItemProps = {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  onPress?: () => void;
};

const SettingsItem = ({ icon, title, subtitle, right, onPress }: SettingsItemProps) => {
  return (
    <Pressable style={styles.item} onPress={onPress}>
      <View style={styles.itemIcon}>
        {icon}
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{title}</Text>
        {subtitle ? <Text style={styles.itemSubtitle}>{subtitle}</Text> : null}
      </View>
      <View style={styles.itemRight}>
        {right || <ChevronRight size={20} color="#808080" />}
      </View>
    </Pressable>
  );
};

export default function SettingsScreen() {
  const theme = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);
  const [dataDownloadEnabled, setDataDownloadEnabled] = useState(false);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView style={styles.content}>
        <SettingsSection title="Preferences">
          <SettingsItem 
            icon={<Globe size={22} color={theme.colors.primary} />} 
            title="Language" 
            subtitle="English (US)"
          />
          <SettingsItem 
            icon={<Bell size={22} color={theme.colors.primary} />} 
            title="Notifications" 
            subtitle={notificationsEnabled ? "Enabled" : "Disabled"}
            right={
              <Switch 
                value={notificationsEnabled} 
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#3e3e3e', true: '#E50914' }}
                thumbColor={'#f4f3f4'}
              />
            }
          />
          <SettingsItem 
            icon={<Moon size={22} color={theme.colors.primary} />} 
            title="Dark Mode" 
            subtitle={darkModeEnabled ? "Enabled" : "Disabled"}
            right={
              <Switch 
                value={darkModeEnabled} 
                onValueChange={setDarkModeEnabled}
                trackColor={{ false: '#3e3e3e', true: '#E50914' }}
                thumbColor={'#f4f3f4'}
              />
            }
          />
        </SettingsSection>

        <SettingsSection title="Account">
          <SettingsItem 
            icon={<Smartphone size={22} color={theme.colors.primary} />} 
            title="My Devices" 
            subtitle="Manage active devices"
          />
          <SettingsItem 
            icon={<Lock size={22} color={theme.colors.primary} />} 
            title="Change Password" 
          />
          <SettingsItem 
            icon={<Shield size={22} color={theme.colors.primary} />} 
            title="Privacy" 
            subtitle="Manage your data and privacy"
          />
        </SettingsSection>

        <SettingsSection title="Data and Storage">
          <SettingsItem 
            icon={<Database size={22} color={theme.colors.primary} />} 
            title="Download Quality" 
            subtitle="High"
          />
          <SettingsItem 
            icon={<Database size={22} color={theme.colors.primary} />} 
            title="Download over Cellular" 
            subtitle={dataDownloadEnabled ? "Enabled" : "Disabled"}
            right={
              <Switch 
                value={dataDownloadEnabled} 
                onValueChange={setDataDownloadEnabled}
                trackColor={{ false: '#3e3e3e', true: '#E50914' }}
                thumbColor={'#f4f3f4'}
              />
            }
          />
        </SettingsSection>

        <SettingsSection title="Support">
          <SettingsItem 
            icon={<HelpCircle size={22} color={theme.colors.primary} />} 
            title="Help & Support" 
          />
          <SettingsItem 
            icon={<Info size={22} color={theme.colors.primary} />} 
            title="About" 
            subtitle="Version 1.0.0"
          />
        </SettingsSection>

        <Pressable style={styles.logoutButton}>
          <LogOut size={18} color="#FFFFFF" />
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#808080',
    textTransform: 'uppercase',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  sectionContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  itemIcon: {
    width: 30,
    alignItems: 'center',
    marginRight: 16,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  itemSubtitle: {
    fontSize: 13,
    color: '#808080',
    marginTop: 2,
  },
  itemRight: {
    marginLeft: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E50914',
    marginHorizontal: 16,
    marginVertical: 24,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 